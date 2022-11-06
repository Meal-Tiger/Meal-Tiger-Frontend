api_url = process.env.API_URL;

export function getFormatedTime(recipe){
	hours = Math.floor(this.time / 60);
	minutes = this.time % 60;

	if(!hours && minutes == 1) return `1 Minute`;
	if(!hours && minutes > 1) return `${minutes} Minuten`;
	if(hours == 1 && minutes < 5)  return `1 Stunde`;
	if(hours == 1 && minutes >= 5)  return `1:${minutes} Stunde`;
	if(hours > 1 && minutes < 5)  return `${hours} Stunden`;
	if(hours > 1 && minutes >= 5)  return `${hours}:${minutes} Stunden`;
}

export function createRecipe(title = undefined, ingredients = undefined, description = undefined, difficulty = undefined, time = undefined){
	return {
		"title": title,
  		"ingredients": ingredients,
		"description": description,
		"difficulty": difficulty,
		"rating": 3.5,
		"time": time,
		"id": Date.now()
	};
}

export async function getRecipe(id){
	response = await fetch(`${api_url}/recipes/${id}`)

	if(response.ok) return response.json();
	else return null;
}

export async function postRecipe(recipe){
	response = await fetch(`${api_url}/recipes`, {
		method: "POST",
		body: JSON.stringify(recipe)
	})
	return response.status;
}

export async function putRecipe(id, recipe){
	response = await fetch(`${api_url}/recipes/${id}`, {
		method: "PUT",
		body: JSON.stringify(recipe)
	})
	return response.status;
}

export async function deleteRecipe(id){
	response = await fetch(`${api_url}/recipes/${id}`, {
		method: "DELETE"
	})
	return response.status;
}

export async function getRecipePage(q = undefined, sort = "title", max = 10, page = 1){
	uri = new URL(`${api_url}/recipes`);
	if(q) uri.searchParams.append("q", q);
	if(sort) uri.searchParams.append("sort", sort);
	if(max) uri.searchParams.append("max", max);
	if(page) uri.searchParams.append("page", page);
	response = await fetch(uri);

	if(response.ok) return response.json();
	else return null;
}