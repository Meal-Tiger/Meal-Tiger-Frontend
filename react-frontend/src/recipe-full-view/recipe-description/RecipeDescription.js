import styles from './RecipeDescription.module.css';

import IngredientsContainer from "./IngredientsContainer";
import { useGetRecipe, getFormatedTime } from '../../modules/api';
import { useParams } from "react-router-dom";

export default function RecipeDescription() {

    let { recipeId } = useParams();
    let recipe = useGetRecipe(recipeId);
    if(recipe)
    {
        return (
            <div className={styles.descriptionGrid}>
                <div className={styles.iconContainer}>
                    <div className={styles.informationContainer}>
                        <div className={styles.informationContainer}>
                            <span className="material-symbols-outlined">person</span>
                            Nutzer
                        </div>
                        <div className={styles.informationContainer}>
                            <span className="material-symbols-outlined">star</span>
                            {recipe.rating} / 5
                        </div>
                    </div>
                    <div className={styles.informationContainer}>
                        <div className={styles.informationContainer}>
                            <span className={`material-symbols-outlined ${styles.iconDifficulty}`}>lunch_dining</span>
                            <span className={`material-symbols-outlined ${styles.iconDifficulty} ${(recipe.difficulty >= 2 ? styles.active : styles.inactive)}`}>lunch_dining</span>
                            <span className={`material-symbols-outlined ${styles.iconDifficulty} ${(recipe.difficulty >= 2 ? styles.active : styles.inactive)}`}>lunch_dining</span>
                            Schwierigkeit
                        </div>
                        <div className={styles.informationContainer}>
                            <span className="material-symbols-outlined">schedule</span>
                            {getFormatedTime(recipe.time)}
                        </div>
                    </div>
                </div>
                <IngredientsContainer ingredientArray={recipe.ingredients}/>
                <div>
                    <h2>Rezeptbeschreibung</h2>
                    <p>{recipe.description}</p>
                </div>
            </div>
        )
    } else {
        return (<div>Loading</div>)
    }
}