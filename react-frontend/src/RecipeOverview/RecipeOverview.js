import { useGetRecipePage } from '../modules/api';

import styles from './RecipeOverview.module.css'

import RecipeCard from './RecipeCard/RecipeCard';

export default function RecipeOverview(){

    let recipes = useGetRecipePage();

    if (recipes) {
        return (
            <div className={styles.container}>
                {recipes.recipes.map( (recipe) => <RecipeCard {...recipe}/>)}
            </div>
        );
    } else {
        return (<div>loading</div>);
    }
    
}