/* eslint react-hooks/exhaustive-deps: 0 */

import {useState, useEffect} from 'react';
import {getAccessToken} from './oidc';

let api_url = process.env.REACT_APP_API_URL;

//#region Helper functions
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
	let json = null;
	if (res.status === 404) error = `${res.status} ${res.statusText} - Keine Rezepte in der Datenbank gefunden`;
	else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
	else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	else json = await res.json();
	if (json) json.recipes.map(async recipe => {
		recipe.rating = await getAverageRating(recipe.id);
		recipe.user = await getUserById(recipe.userId);
	});


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
	let json = null;
	if (res.status === 404) error = `${res.status} ${res.statusText} - Rezept wurde nicht in der Datenbank gefunden`;
	else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
	else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	else json = await res.json();
	if (json)  {
		data = json
		data.rating = await getAverageRating(recipe.id);
		data.user = await getUserById(recipe.userId);
	};

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

	fetch(`${api_url}/recipes`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${await getAccessToken()}`
		},
		body: JSON.stringify(recipe)
	}).then((res) => {
		if (res.status === 401) error = `${res.status} ${res.statusText} - User ist nicht Angemeldet`;
		else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
		else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	});

	return error;
}

export async function putRecipe(id, recipe) {
	let error = null;

	fetch(`${api_url}/recipes/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${await getAccessToken()}`
		},
		body: JSON.stringify(recipe)
	}).then((res) => {
		if (res.status === 401) error = `${res.status} ${res.statusText} - User ist nicht Angemeldet`;
		else if (res.status === 403) error = `${res.status} ${res.statusText} - User ist nicht berechtigt, diese Ressource zu verwalten`;
		else if (res.status === 404) error = `${res.status} ${res.statusText} - Rezept wurde nicht in der Datenbank gefunden`;
		else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
		else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	});

	return error;
}

export async function deleteRecipe(id) {
	let error = null;

	fetch(`${api_url}/recipes/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${await getAccessToken()}`
		}
	}).then((res) => {
		if (res.status === 401) error = `${res.status} ${res.statusText} - User ist nicht Angemeldet`;
		else if (res.status === 403) error = `${res.status} ${res.statusText} - User ist nicht berechtigt, diese Ressource zu verwalten`;
		else if (res.status === 404) error = `${res.status} ${res.statusText} - Rezept wurde nicht in der Datenbank gefunden`;
		else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
		else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	});

	return error;
}
//#endregion

//#region Rating functions
export async function getRatingsPage(id, {sort = undefined, size = undefined, page = 0}) {
	let uri = new URL(`${api_url}/recipes/${id}/ratings`);
	if (sort) uri.searchParams.append('sort', sort);
	if (size) uri.searchParams.append('size', size);
	if (page) uri.searchParams.append('page', page);

	const res = await fetch(uri);
	let error = null;
	let data = null;
	if (res.status === 404) error = `${res.status} ${res.statusText} - Keine Bewertungen für dieses Rezept in der Datenbank gefunden`;
	else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
	else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	else data = await res.json();

	return [data, error];
}

export function useGetRatingsPage(id, {sort = undefined, size = undefined, page = 0}){
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		getRatingsPage({sort: sort, size: size, page: page}).then(([data, error]) => {
			setData(data);
			setError(error);
		});
	}, [sort, size, page]);

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
	else data = await res.json();

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

	fetch(`${api_url}/recipes/${id}/ratings`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${await getAccessToken()}`
		},
		body: JSON.stringify({
			rating: rating,
			comment: comment
		})
	}).then((res) => {
		if (res.status === 400) error = `${res.status} ${res.statusText} - Bewertung hat das Falsche Format`;
		else if (res.status === 401) error = `${res.status} ${res.statusText} - User ist nicht Angemeldet`;
		else if (res.status === 403) error = `${res.status} ${res.statusText} - User ist nicht Autorisiert, dieses Rezept zu Bewerten`;
		else if (res.status === 404) error = `${res.status} ${res.statusText} - Rezept wurde nicht gefunden`;
		else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
		else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	});

	return error;
}

export async function putRating(id, {rating = undefined, comment = undefined}) {
	let error = null;

	fetch(`${api_url}/recipes/${id}/ratings`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${await getAccessToken()}`
		},
		body: JSON.stringify({
			rating: rating,
			comment: comment
		})
	}).then((res) => {
		if (res.status === 400) error = `${res.status} ${res.statusText} - Bewertung hat das Falsche Format`;
		else if (res.status === 401) error = `${res.status} ${res.statusText} - User ist nicht Angemeldet`;
		else if (res.status === 403) error = `${res.status} ${res.statusText} - User ist nicht Autorisiert, dieses Rezept zu Bewerten`;
		else if (res.status === 404) error = `${res.status} ${res.statusText} - Rezept wurde nicht gefunden`;
		else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
		else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	});

	return error;
}

export async function deleteRating(id) {
	let error = null;

	fetch(`${api_url}/recipes/${id}/ratings`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${await getAccessToken()}`
		}
	}).then((res) => {
		if (res.status === 400) error = `${res.status} ${res.statusText} - Bewertung hat das Falsche Format`;
		else if (res.status === 401) error = `${res.status} ${res.statusText} - User ist nicht Angemeldet`;
		else if (res.status === 403) error = `${res.status} ${res.statusText} - User ist nicht Autorisiert, dieses Rezept zu Bewerten`;
		else if (res.status === 404) error = `${res.status} ${res.statusText} - Rezept wurde nicht gefunden`;
		else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
		else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	});

	return error;
}
//#endregion

//#region Image functions
export async function postImages(images) {

	let error = null;
	let formdata = new FormData()
	
	images.forEach(image => {
		formdata.append("file", image)
	});

	fetch(`${api_url}/recipes`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${await getAccessToken()}`
		},
		body: formdata
	}).then((res) => {
		if (res.status === 400) error = `${res.status} ${res.statusText} - Nicht unterstütztes Format`;
		else if (res.status === 401) error = `${res.status} ${res.statusText} - User ist nicht Angemeldet`;
		else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
		else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	});

	return error;

}

export async function deleteImage(id) {
	let error = null;

	fetch(`${api_url}/image/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${await getAccessToken()}`
		}
	}).then((res) => {
		if (res.status === 401) error = `${res.status} ${res.statusText} - User ist nicht Angemeldet`;
		else if (res.status === 403) error = `${res.status} ${res.statusText} - User ist nicht Autorisiert, dieses Bild zu löschen`;
		else if (res.status === 404) error = `${res.status} ${res.statusText} - Bild wurde nicht gefunden`;
		else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
		else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	});

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

	fetch(`${api_url}/user`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${await getAccessToken()}`
		},
		body: JSON.stringify({
			username: username,
			picture: picture
		})
	}).then((res) => {
		if (res.status === 401) error = `${res.status} ${res.statusText} - User ist nicht Angemeldet`;
		else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
		else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	});

	return error;
}

export async function putUser({username = undefined, picture = undefined}) {
	let error = null;

	fetch(`${api_url}/user`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${await getAccessToken()}`
		},
		body: JSON.stringify({
			username: username,
			picture: picture
		})
	}).then((res) => {
		if (res.status === 401) error = `${res.status} ${res.statusText} - User ist nicht Angemeldet`;
		else if (res.status === 500) error = `${res.status} ${res.statusText} - Serverfehler`;
		else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`;
	});

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
	if (res.status === 404) error = `${res.status} ${res.statusText} - Benutzer hat noch kein Profil`;
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