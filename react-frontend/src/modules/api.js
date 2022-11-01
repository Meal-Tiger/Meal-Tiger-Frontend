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
	return recipe;
}

export function getRecipe(id){
	return recipe;
}

export function postRecipe(recipe){
	return sucess;
}

export function putRecipe(id, recipe){
	return sucess;
}

export function deleteRecipe(id){
	return sucess;
}

export function getRecipes(q = undefined, sort = date, max = 20, page = 1){
	return recipes;
}