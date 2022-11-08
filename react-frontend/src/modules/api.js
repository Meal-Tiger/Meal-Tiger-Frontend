import { useState, useEffect } from "react";

let api_url = process.env.REACT_APP_API_URL;

export function getFormatedTime(recipe){
	let hours = Math.floor(this.time / 60);
	let minutes = this.time % 60;

	if(!hours && minutes == 1) return `1 Minute`;
	if(!hours && minutes > 1) return `${minutes} Minuten`;
	if(hours == 1 && minutes < 5)  return `1 Stunde`;
	if(hours == 1 && minutes >= 5)  return `1:${minutes} Stunde`;
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
		"time": time,
		"id": Date.now()
	};
}

export function useGetRecipe(id){
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch(`${api_url}/recipes/${id}`)
		  .then((res) => res.json())
		  .then((data) => setData(data));
	}, [id]);

	return data;
}

export function usePostRecipe(recipe){
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch(`${api_url}/recipes`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(recipe)
		})
		  .then((res) => res.status)
		  .then((data) => setData(data));
	}, [recipe]);

	return data;
}

export function usePutRecipe(id, recipe){
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch(`${api_url}/recipes/${id}`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(recipe)
		})
		  .then((res) => res.status)
		  .then((data) => setData(data));
	}, [id, recipe]);

	return data;
}

export function useDeleteRecipe(id){
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch(`${api_url}/recipes/${id}`, {
			method: "DELETE"
		})
		  .then((res) => res.status)
		  .then((data) => setData(data));
	}, [id]);

	return data;
}

export function useGetRecipePage(q = undefined, sort = "title", max = 10, page = 1){
	const [data, setData] = useState(null);

	let uri = new URL(`${api_url}/recipes`);
	if(q) uri.searchParams.append("q", q);
	if(sort) uri.searchParams.append("sort", sort);
	if(max) uri.searchParams.append("max", max);
	if(page) uri.searchParams.append("page", page);

	useEffect(() => {
		fetch(`${api_url}/recipes`)
		  .then((res) => res.json())
		  .then((data) => setData(data));
	}, [uri]);

	return data;
}