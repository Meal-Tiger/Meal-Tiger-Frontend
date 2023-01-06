/* eslint react-hooks/exhaustive-deps: 0 */

import {useState, useEffect} from 'react';
import {getAccessToken} from './oidc';

let api_url = process.env.REACT_APP_API_URL;

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

export function useGetRecipePage({q = undefined, sort = 'title', size = 10, page = 0}) {
	const [error, setError] = useState(null);
	
	const [data, setData] = useState(null);

	let uri = new URL(`${api_url}/recipes`);
	if (q) uri.searchParams.append('q', q);
	if (sort) uri.searchParams.append('sort', sort);
	if (size) uri.searchParams.append('size', size);
	if (page) uri.searchParams.append('page', page);

	useEffect(() => {
		fetch(uri)
			.then((res) => {
				if (res.status == 404) setError(`${res.status} ${res.statusText} - Keine Rezepte in der Datenbank gefunden`)
				else if (res.status == 500) setError(`${res.status} ${res.statusText} - Serverfehler`)
				else if (!res.ok) setError(`${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`)
				else return res.json()
			})
			.then((data) => setData(data));
	}, [q, sort, size, page]);

	return [data, error];
}

export function useGetRecipe(id) {
	const [error, setError] = useState(null);
	
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch(`${api_url}/recipes/${id}`)
			.then((res) => {
				if (res.status == 404) setError(`${res.status} ${res.statusText} - Rezept wurde nicht in der Datenbank gefunden`)
				else if (res.status == 500) setError(`${res.status} ${res.statusText} - Serverfehler`)
				else if (!res.ok) setError(`${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`)
				else return res.json()
			})
			.then((data) => setData(data));
	}, []);

	return [data, error];
}

export async function postRecipe(recipe) {

	let error = null;

	fetch(`${api_url}/recipes`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${await getAccessToken()}`
		},
		body: JSON.stringify(recipe)
	})
	.then((res) => {
		if (res.status == 401) error = `${res.status} ${res.statusText} - User ist nicht Angemeldet`
		else if (res.status == 500) error = `${res.status} ${res.statusText} - Serverfehler`
		else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`
	})

	return error;

}

export async function putRecipe(id, recipe) {
	
	let error = null;

	fetch(`${api_url}/recipes/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(recipe)
	})
	.then((res) => {
		if (res.status == 401) error = `${res.status} ${res.statusText} - User ist nicht Angemeldet`
		else if (res.status == 403) error = `${res.status} ${res.statusText} - User ist nicht berechtigt, diese Ressource zu verwalten`
		else if (res.status == 404) error = `${res.status} ${res.statusText} - Rezept wurde nicht in der Datenbank gefunden`
		else if (res.status == 500) error = `${res.status} ${res.statusText} - Serverfehler`
		else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`
	})

	return error;
	
}

export async function deleteRecipe(id) {
	
	let error = null;

	fetch(`${api_url}/recipes/${id}`, {
		method: 'DELETE'
	})
	.then((res) => {
		if (res.status == 401) error = `${res.status} ${res.statusText} - User ist nicht Angemeldet`
		else if (res.status == 403) error = `${res.status} ${res.statusText} - User ist nicht berechtigt, diese Ressource zu verwalten`
		else if (res.status == 404) error = `${res.status} ${res.statusText} - Rezept wurde nicht in der Datenbank gefunden`
		else if (res.status == 500) error = `${res.status} ${res.statusText} - Serverfehler`
		else if (!res.ok) error = `${res.status} ${res.statusText} - Unerwarteter Fehler; HALT and Catch Fire`
	})

	return error;

}
