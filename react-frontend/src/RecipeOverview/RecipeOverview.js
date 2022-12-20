import { useNavigate } from 'react-router-dom';

import { useGetRecipePage } from '../modules/api';

import styles from './RecipeOverview.module.css'

import RecipeCard from './RecipeCard/RecipeCard';

export default function RecipeOverview(){

    let navigate = useNavigate();
    let recipes = useGetRecipePage();

    if (recipes) {
        return (
            <div className={styles.container}>
                {recipes.recipes.map( (recipe) => <RecipeCard onClick={() => navigate(`/recipe/${recipe.id}`)} {...recipe}/>)}
            </div>
        );
    } else {
        return (<div>loading</div>);
    }
    
}