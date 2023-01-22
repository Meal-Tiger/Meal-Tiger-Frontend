/* eslint react-hooks/exhaustive-deps: 0 */

import {useState, useEffect} from 'react';
import {getAccessToken} from './oidc';

let api_url = process.env.REACT_APP_API_URL;
if (window._env_) api_url = window._env_.REACT_APP_API_URL;

//#region Helper functions
export function getAnonUser(id){
	return {
		"userId": id,
		"username": "Anonym",
		"picture": "0"
	}
}

export function getImageUrl(id){
	if (id === '0' || id === undefined) return "/platzhalter.jpg"
	else return `${api_url}/image/${id}`
}

export function getFormatedTime(time) {
	let hours = Math.floor(time / 60);
	let minutes = time % 60;

	if (!hours && minutes === 1) return `1 Minute`;
	if (!hours && minutes > 1) return `${minutes} Minuten`;
	if (hours === 1 && minutes < 5) return `1 Stunde`;
	if (hours === 1 && minutes >= 5) return `1:${minutes} Stunde`;
	if (hours > 1 && minutes < 5) return `${hours} Stunden`;
	if (hours > 1 && minutes >= 5) return `${hours}:${minutes} Stunden`;
}

export function createRecipe({title = undefined, ingredients = undefined, description = undefined, difficulty = undefined, time = undefined}) {
	return {
		title: title,
		ingredients: ingredients,
		description: description,
		difficulty: difficulty,
		rating: 3,
		time: time
	};
}
//#endregion

//#region Recipe functions
export async function getRecipePage({q = undefined, sort = undefined, size = undefined, page = 0}) {
	let uri = new URL(`${api_url}/recipes`);
	if (q) uri.searchParams.append('q', q);
	if (sort) uri.searchParams.append('sort', sort);
	if (size) uri.searchParams.append('size', size);
	if (page) uri.searchParams.append('page', page);

	let res = await fetch(uri);
	let error = null;
	let data = null;
	if (res.status === 404) error = `${res.status} ${res.statusText} - Keine Rezepte in der Datenbank gefunden`;
	else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
	else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	else data = await res.json();

	if(data){
		data.recipes = await Promise.all(data.recipes.map(async recipe => {
			return {
				...recipe,
				rating: (await getAverageRating(recipe.id))[0],
				user: (await getUserById(recipe.userId))[0]
			};
		}))
	}
	return [data, error];
}

export function useGetRecipePage({q = undefined, sort = undefined, size = undefined, page = 0}) {
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		getRecipePage({q: q, sort: sort, size: size, page: page}).then(([data, error]) => {
			setData(data);
			setError(error);
		});
	}, [q, sort, size, page]);

	return [data, error];
}

export async function getRecipe(id) {
	let res = await fetch(`${api_url}/recipes/${id}`);
	let error = null;
	let data = null;
	if (res.status === 404) error = `${res.status} ${res.statusText} - Rezept wurde nicht in der Datenbank gefunden`;
	else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
	else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	else data = await res.json();

	if (data) {
		data.rating = (await getAverageRating(data.id))[0];
		data.user = (await getUserById(data.userId))[0];
	}
	return [data, error];
}

export function useGetRecipe(id) {
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		getRecipe(id).then(([data, error]) => {
			setData(data);
			setError(error);
		});
	}, []);

	return [data, error];
}

export async function postRecipe(recipe) {
	let error = null;
	let id = null;

	const res = await fetch(`${api_url}/recipes`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${await getAccessToken()}`
		},
		body: JSON.stringify(recipe)
	})
	
	if (res.status === 401) error = `${res.status} ${res.statusText} - User ist nicht Angemeldet`;
	else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
	else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	else id = (await res.json()).id

	return [id, error];
}

export function usePostRecipe(recipe){
	const [error, setError] = useState(null);

	useEffect(() => {
		postRecipe(recipe).then((error) => {
			setError(error);
		});
	}, []);

	return error;
}

export async function putRecipe(id, recipe) {
	let error = null;

	const res = await fetch(`${api_url}/recipes/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${await getAccessToken()}`
		},
		body: JSON.stringify(recipe)
	})

	if (res.status === 401) error = `${res.status} ${res.statusText} - User ist nicht Angemeldet`;
	else if (res.status === 403) error = `${res.status} ${res.statusText} - User ist nicht berechtigt, diese Ressource zu verwalten`;
	else if (res.status === 404) error = `${res.status} ${res.statusText} - Rezept wurde nicht in der Datenbank gefunden`;
	else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
	else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;

	return error;
}

export function usePutRecipe(recipe){
	const [error, setError] = useState(null);

	useEffect(() => {
		putRecipe(recipe).then((error) => {
			setError(error);
		});
	}, []);

	return error;
}

export async function deleteRecipe(id) {
	let error = null;

	const res = await fetch(`${api_url}/recipes/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${await getAccessToken()}`
		}
	})
	
	if (res.status === 401) error = `${res.status} ${res.statusText} - User ist nicht Angemeldet`;
	else if (res.status === 403) error = `${res.status} ${res.statusText} - User ist nicht berechtigt, diese Ressource zu verwalten`;
	else if (res.status === 404) error = `${res.status} ${res.statusText} - Rezept wurde nicht in der Datenbank gefunden`;
	else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
	else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;

	return error;
}

export function useDeleteRecipe(id){
	const [error, setError] = useState(null);

	useEffect(() => {
		deleteRecipe(id).then((error) => {
			setError(error);
		});
	}, []);

	return error;
}
//#endregion

//#region Rating functions
export async function getRatingsPage(id, {size = null, page = 0}) {
	let uri = new URL(`${api_url}/recipes/${id}/ratings`);
	if (size) uri.searchParams.append('size', size);
	if (page) uri.searchParams.append('page', page);

	const res = await fetch(uri);
	let error = null;
	let data = null;
	if (res.status === 404) error = `${res.status} ${res.statusText} - Keine Bewertungen für dieses Rezept in der Datenbank gefunden`;
	else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
	else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	else data = await res.json();
	if(data){
		data.ratings = await Promise.all(data.ratings.map(async rating => {
			return {
				...rating,
				user: (await getUserById(rating.userId))[0]
			};
		}))
	}

	return [data, error];
}

export function useGetRatingsPage(id, {size = null, page = 0}){
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		getRatingsPage(id, {size: size, page: page}).then(([data, error]) => {
			setData(data);
			setError(error);
		});
	}, [size, page]);

	return [data, error];
}

export async function getRatingById(id) {
	const res = await fetch(`${api_url}/ratings/${id}`);
	let error = null;
	let data = null;
	if (res.status === 404) error = `${res.status} ${res.statusText} - Bewertung wurde nicht in der Datenbank gefunden`;
	else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
	else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	else data = await res.json();

	return [data, error];
}

export function useGetRatingById(id){
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		getRatingById(id).then(([data, error]) => {
			setData(data);
			setError(error);
		});
	}, []);

	return [data, error];
}

export async function getAverageRating(id) {
	const res = await fetch(`${api_url}/recipes/${id}/rating`);
	let error = null;
	let data = null;
	if (res.status === 404) error = `${res.status} ${res.statusText} - Rezept wurde nicht in der Datenbank gefunden`;
	else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
	else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	else data = Math.round((await res.json()).ratingValue * 100) / 100;

	return [data, error];
}

export function useGetAverageRating(id){
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		getAverageRating(id).then(([data, error]) => {
			setData(data);
			setError(error);
		});
	}, []);

	return [data, error];
}

export async function postRating(id, {rating = undefined, comment = undefined}) {
	let error = null;

	const res = await fetch(`${api_url}/recipes/${id}/ratings`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${await getAccessToken()}`
		},
		body: JSON.stringify({
			ratingValue: rating,
			comment: comment
		})
	})
	
	if (res.status === 400) error = `${res.status} ${res.statusText} - Bewertung hat das Falsche Format`;
	else if (res.status === 401) error = `${res.status} ${res.statusText} - User ist nicht Angemeldet`;
	else if (res.status === 403) error = `${res.status} ${res.statusText} - User ist nicht Autorisiert, dieses Rezept zu Bewerten`;
	else if (res.status === 404) error = `${res.status} ${res.statusText} - Rezept wurde nicht gefunden`;
	else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
	else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;

	return error;
}

export function usePostRating(id, {rating = undefined, comment = undefined}){
	const [error, setError] = useState(null);

	useEffect(() => {
		postRating(id, {rating: rating, comment: comment}).then((error) => {
			setError(error);
		});
	}, []);

	return error;
}

export async function putRating(id, {rating = undefined, comment = undefined}) {
	let error = null;

	const res = await fetch(`${api_url}/recipes/${id}/ratings`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${await getAccessToken()}`
		},
		body: JSON.stringify({
			rating: rating,
			comment: comment
		})
	})
	
		if (res.status === 400) error = `${res.status} ${res.statusText} - Bewertung hat das Falsche Format`;
		else if (res.status === 401) error = `${res.status} ${res.statusText} - User ist nicht Angemeldet`;
		else if (res.status === 403) error = `${res.status} ${res.statusText} - User ist nicht Autorisiert, dieses Rezept zu Bewerten`;
		else if (res.status === 404) error = `${res.status} ${res.statusText} - Rezept wurde nicht gefunden`;
		else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
		else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;

	return error;
}

export function usePutRating(id, {rating = undefined, comment = undefined}){
	const [error, setError] = useState(null);

	useEffect(() => {
		putRating(id, {rating: rating, comment: comment}).then((error) => {
			setError(error);
		});
	}, []);

	return error;
}

export async function deleteRating(id) {
	let error = null;

	const res = await fetch(`${api_url}/recipes/${id}/ratings`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${await getAccessToken()}`
		}
	})
	
		if (res.status === 400) error = `${res.status} ${res.statusText} - Bewertung hat das Falsche Format`;
		else if (res.status === 401) error = `${res.status} ${res.statusText} - User ist nicht Angemeldet`;
		else if (res.status === 403) error = `${res.status} ${res.statusText} - User ist nicht Autorisiert, dieses Rezept zu Bewerten`;
		else if (res.status === 404) error = `${res.status} ${res.statusText} - Rezept wurde nicht gefunden`;
		else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
		else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;

	return error;
}

export function useDeleteRating(id){
	const [error, setError] = useState(null);

	useEffect(() => {
		deleteRating(id).then((error) => {
			setError(error);
		});
	}, []);

	return error;
}
//#endregion

//#region Image functions
export async function postImages(images) {

	let error = null;
	let data = null;
	let formdata = new FormData()
	
	images.forEach(image => {
		formdata.append("files", image)
	});

	const res = await fetch(`${api_url}/images`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${await getAccessToken()}`
		},
		body: formdata
	})
	
	if (res.status === 400) error = `${res.status} ${res.statusText} - Nicht unterstütztes Format`;
	else if (res.status === 401) error = `${res.status} ${res.statusText} - User ist nicht Angemeldet`;
	else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
	else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	else data = await res.json();
	return [data, error];
}

export function usePostImages(images){
	const [error, setError] = useState(null);

	useEffect(() => {
		postImages(images).then((error) => {
			setError(error);
		});
	}, []);

	return error;
}

export async function deleteImage(id) {
	let error = null;

	const res = await fetch(`${api_url}/image/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${await getAccessToken()}`
		}
	})

		if (res.status === 401) error = `${res.status} ${res.statusText} - User ist nicht Angemeldet`;
		else if (res.status === 403) error = `${res.status} ${res.statusText} - User ist nicht Autorisiert, dieses Bild zu löschen`;
		else if (res.status === 404) error = `${res.status} ${res.statusText} - Bild wurde nicht gefunden`;
		else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
		else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;

	return error;
}

export function useDeleteImage(id){
	const [error, setError] = useState(null);

	useEffect(() => {
		deleteImage(id).then((error) => {
			setError(error);
		});
	}, []);

	return error;
}

//#endregion

//#region User functions
export async function getUser() {
	let res = await fetch(`${api_url}/user`, {
		headers: {
			'Authorization': `Bearer ${await getAccessToken()}`
		}
	});
	let error = null;
	let data = null;
	if (res.status === 401) error = `${res.status} ${res.statusText} - Benutzer ist nicht angemeldet`;
	else if (res.status === 404) error = `${res.status} ${res.statusText} - Benutzer hat noch kein Profil`;
	else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
	else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	else data = await res.json();

	return [data, error];
}

export function useGetUser(){
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		getUser().then(([data, error]) => {
			setData(data);
			setError(error);
		});
	}, []);

	return [data, error];
}

export async function postUser({username = undefined, picture = undefined}) {
	let error = null;

	const res = await fetch(`${api_url}/user`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${await getAccessToken()}`
		},
		body: JSON.stringify({
			username: username,
			picture: picture
		})
	})
	
	if (res.status === 401) error = `${res.status} ${res.statusText} - User ist nicht Angemeldet`;
	else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
	else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;

	return error;
}

export function usePostUser({username = undefined, picture = undefined}){
	const [error, setError] = useState(null);

	useEffect(() => {
		postUser({username: username, picture: picture}).then((error) => {
			setError(error);
		});
	}, []);

	return error;
}

export async function putUser({username = undefined, profilePictureId = undefined}) {
	let error = null;

	const res = await fetch(`${api_url}/user`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${await getAccessToken()}`
		},
		body: JSON.stringify({
			username: username,
			profilePictureId: profilePictureId
		})
	})
	
	if (res.status === 401) error = `${res.status} ${res.statusText} - User ist nicht Angemeldet`;
	else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
	else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;

	return error;
}

export function usePutUser({username = undefined, profilePictureId = undefined}){
	const [error, setError] = useState(null);

	useEffect(() => {
		putUser({username: username, profilePictureId: profilePictureId}).then((error) => {
			setError(error);
		});
	}, []);

	return error;
}

export async function getUserRecipesPage({sort = undefined, size = undefined, page = 0}) {
	let uri = new URL(`${api_url}/user/recipes`);
	if (sort) uri.searchParams.append('sort', sort);
	if (size) uri.searchParams.append('size', size);
	if (page) uri.searchParams.append('page', page);

	let res = await fetch(uri, {
		headers: {
			'Authorization': `Bearer ${await getAccessToken()}`
		}
	});
	let error = null;
	let data = null;
	if (res.status === 401) error = `${res.status} ${res.statusText} - User ist nicht angemeldet`;
	else if (res.status === 404) error = `${res.status} ${res.statusText} - Keine Rezepte in der Datenbank gefunden`;
	else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
	else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	else data = await res.json();

	return [data, error];
}

export function useGetUserRecipesPage({sort = undefined, size = undefined, page = 0}){
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		getUserRecipesPage({sort: sort, size: size, page: page}).then(([data, error]) => {
			setData(data);
			setError(error);
		});
	}, []);

	return [data, error];
}

export async function getUserImages() {
	let uri = new URL(`${api_url}/user/images`);

	let res = await fetch(uri, {
		headers: {
			'Authorization': `Bearer ${await getAccessToken()}`
		}
	});
	let error = null;
	let data = null;
	if (res.status === 401) error = `${res.status} ${res.statusText} - User ist nicht angemeldet`;
	else if (res.status === 404) error = `${res.status} ${res.statusText} - Keine Bilder in der Datenbank gefunden`;
	else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
	else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	else data = await res.json();

	return [data, error];
}

export function useGetUserImages(){
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		getUserImages().then(([data, error]) => {
			setData(data);
			setError(error);
		});
	}, []);

	return [data, error];
}

export async function getUserById(id) {
	let res = await fetch(`${api_url}/user/${id}`);
	let error = null;
	let data = null;
	if (res.status === 404){
		error = `${res.status} ${res.statusText} - Benutzer hat noch kein Profil`;
		data = getAnonUser(id);
	}
	else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
	else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	else data = await res.json();
	return [data, error];
}

export function useGetUserById(id){
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		getUserById(id).then(([data, error]) => {
			setData(data);
			setError(error);
		});
	}, []);

	return [data, error];
}

export async function getUserRecipesPageById(id, {sort = undefined, size = undefined, page = 0}) {
	let uri = new URL(`${api_url}/user/recipes/${id}`);
	if (sort) uri.searchParams.append('sort', sort);
	if (size) uri.searchParams.append('size', size);
	if (page) uri.searchParams.append('page', page);

	let res = await fetch(uri);
	let error = null;
	let data = null;
	if (res.status === 404) error = `${res.status} ${res.statusText} - Keine Rezepte in der Datenbank gefunden`;
	else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
	else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	else data = await res.json();

	return [data, error];
}

export function useGetUserRecipesPageById(id, {sort = undefined, size = undefined, page = 0}){
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		getUserRecipesPageById(id, {sort: sort, size: size, page: page}).then(([data, error]) => {
			setData(data);
			setError(error);
		});
	}, []);

	return [data, error];
}

export async function getUserImagesById(id) {
	let uri = new URL(`${api_url}/user/images/${id}`);

	let res = await fetch(uri);
	let error = null;
	let data = null;
	if (res.status === 404) error = `${res.status} ${res.statusText} - Keine Bilder in der Datenbank gefunden`;
	else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
	else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	else data = await res.json();

	return [data, error];
}

export function useGetUserImagesById(id){
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		getUserImagesById(id).then(([data, error]) => {
			setData(data);
			setError(error);
		});
	}, []);

	return [data, error];
}
//#endregion