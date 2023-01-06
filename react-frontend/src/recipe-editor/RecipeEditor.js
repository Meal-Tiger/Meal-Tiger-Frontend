import styles from './RecipeEditor.module.css';
import image_01 from '../recipe-full-view/image-slider/image-01.jpg';
import image_02 from '../recipe-full-view/image-slider/image-02.jpg';
import image_03 from '../recipe-full-view/image-slider/image-03.jpg';
import UploadedImages from './uploadedImages';
import {createContext, useMemo, useState} from 'react';
import IngredientsContainerEditable from './IngredientsContainerEditable';
import {postRecipe} from 'modules/api';

export const RecipeContext = createContext({
    recipe: {
        title: "",
        description: "",
        difficulty: 0,
        rating: 5,
        time: 0,
        ingredients: []
    },
    setRecipe: () => {
    },
});

export default function RecipeEditor() {

    const slides = [{url: image_01}, {url: image_02}, {url: image_03}];
    const [time, setTime] = useState([0, 0]);
    const [recipe, setRecipe] = useState({
        title: "",
        description: "",
        difficulty: 0,
        rating: 5,
        time: 0,
        ingredients: []
    });

    const value = useMemo(
        () => ({recipe, setRecipe}),
        [recipe]
    );

    const switchDifficulty = (difficulty) => {
        setRecipe({...recipe, difficulty: difficulty});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setRecipe({...recipe, time: (parseInt(time[0])*60) + parseInt(time[1])});
        postRecipe(recipe);
    };

    return (
        <RecipeContext.Provider value={value}>
            <form onSubmit={handleSubmit}>
                <div className={styles.container}>
                    <div className={styles["left-column"]}>
                        <div className={styles["recipe-input"]}>
                            <label htmlFor={'recipeName'}>Rezeptname</label>
                            <input name={'recipeName'} type={'text'} value={recipe.title} onChange={(event) => {
                                setRecipe({...recipe, title: event.target.value})
                            }}/>
                        </div>
                        <div className={styles["recipe-input"]}>
                            <label htmlFor={'recipeDescription'}>Rezeptbeschreibung</label>
                            <textarea name={'recipeDescription'} rows={4} value={recipe.description}
                                      onChange={(event) => {
                                          setRecipe({...recipe, description: event.target.value})
                                      }}></textarea>
                        </div>
                        <button className={"btn btn-primary hide-mobile hide-tablet"} type="submit">
                            Rezept speichern
                        </button>
                    </div>

                    <div className={styles["right-column"]}>
                        <UploadedImages images={slides}/>
                        <div className={styles["information-container"]}>
                            <div className={styles["information-container-child"]}>
							<span
                                className={`material-symbols-outlined ${styles["symbols-difficulty"]}  ${styles.active}`}
                                onClick={() => switchDifficulty(1)}>
								lunch_dining
							</span>
                                <span
                                    className={`material-symbols-outlined ${styles["symbols-difficulty"]}  ${recipe.difficulty >= 2 ? styles.active : styles.inactive}`}
                                    onClick={() => switchDifficulty(2)}>
								lunch_dining
							</span>
                                <span
                                    className={`material-symbols-outlined ${styles["symbols-difficulty"]}  ${recipe.difficulty >= 3 ? styles.active : styles.inactive}`}
                                    onClick={() => switchDifficulty(3)}>
								lunch_dining
							</span>
                                <span>Schwierigkeit</span>
                            </div>
                            <div className={styles["information-container-child"]}>
                                <span className="material-symbols-outlined">schedule</span>
                                <input name={'recipeTimeH'} className={styles["schedule-input"]} type={'number'}
                                       value={time[0]} onChange={(event) => {time[0] = event.target.value; setTime([...time])}}/>
                                <span className={styles["schedule-input-text"]}>Std. </span>
                                <input name={'recipeTimeM'} className={styles["schedule-input"]} type={'number'} value={time[1]} onChange={(event) => {time[1] = event.target.value; setTime([...time])}}/>
                                <span className={styles["schedule-input-text"]}>min.</span>
                            </div>
                        </div>
                        <div className={styles["ingredient-table-wrapper"]}>
                            <IngredientsContainerEditable/>
                        </div>
                        <button className={"btn btn-primary hide-desktop"} type="submit">
                            Rezept speichern
                        </button>
                    </div>


                </div>
            </form>
        </RecipeContext.Provider>
    );
}
