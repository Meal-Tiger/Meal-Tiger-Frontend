import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useGetRecipePage } from '../modules/api';

import { useParams } from "react-router-dom";

import styles from './RecipeOverview.module.css'

import RecipeCard from './RecipeCard/RecipeCard';

export default function RecipeOverview(){

    let navigate = useNavigate();
    let {query} = useParams();
    let recipes = useGetRecipePage({q: query});    

    if (recipes) {
        return (
            <div className={styles["recipe-overview-container"]}>
                {recipes.recipes.map( (recipe) => <RecipeCard key={recipe.id} onClick={() => navigate(`/recipe/${recipe.id}`)} {...recipe}/>)}
            </div>
        );
    } else {
        return (<div>loading</div>);
    }
    
}