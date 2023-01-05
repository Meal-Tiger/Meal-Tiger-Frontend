/* eslint react-hooks/exhaustive-deps: 0 */

import { useState, useEffect } from "react";
import { getAccessToken } from "./oidc";

let api_url = process.env.REACT_APP_API_URL;

export function getFormatedTime(recipe){
	let hours = Math.floor(this.time / 60);
	let minutes = this.time % 60;

	if(!hours && minutes === 1) return `1 Minute`;
	if(!hours && minutes > 1) return `${minutes} Minuten`;
	if(hours === 1 && minutes < 5)  return `1 Stunde`;
	if(hours === 1 && minutes >= 5)  return `1:${minutes} Stunde`;
	if(hours > 1 && minutes < 5)  return `${hours} Stunden`;
	if(hours > 1 && minutes >= 5)  return `${hours}:${minutes} Stunden`;
}

export function createRecipe({title = undefined, ingredients = undefined, description = undefined, difficulty = undefined, time = undefined}){
	return {
		"title": title,
  		"ingredients": ingredients,
		"description": description,
		"difficulty": difficulty,
		"rating": 3,
		"time": time
	};
}

export function useGetRecipePage({q = undefined, sort = "title", max = 10, page = 0}){
	
	const [data, setData] = useState(null);

	let uri = new URL(`${api_url}/recipes`);
	if(q) uri.searchParams.append("q", q);
	if(sort) uri.searchParams.append("sort", sort);
	if(max) uri.searchParams.append("max", max);
	if(page) uri.searchParams.append("page", page);

	useEffect(() => {
		fetch(uri)
		  .then((res) => res.json())
		  .then((data) => setData(data));
	}, [q, sort, max, page]);

	return data;
}

export function useGetRecipe(id){
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch(`${api_url}/recipes/${id}`)
		  .then((res) => res.json())
		  .then((data) => setData(data));
	}, []);

	return data;
}

export async function postRecipe(recipe){

	return fetch(`${api_url}/recipes`, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${await getAccessToken()}`
		},
		body: JSON.stringify(recipe)
	})
	.then((res) => res.status);

}

export function putRecipe(id, recipe){

	return fetch(`${api_url}/recipes/${id}`, {
		method: "PUT",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(recipe)
	})
	.then((res) => res.status);

}

export function useDeleteRecipe(id){

	return fetch(`${api_url}/recipes/${id}`, {
		method: "DELETE"
	})
	.then((res) => res.status);

}