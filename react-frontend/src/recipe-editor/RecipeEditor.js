import styles from './RecipeEditor.module.css';
import image_01 from "../recipe-full-view/image-slider/image-01.jpg";
import image_02 from "../recipe-full-view/image-slider/image-02.jpg";
import image_03 from "../recipe-full-view/image-slider/image-03.jpg";
import UploadedImages from "./uploadedImages";
import {useState} from "react";
import IngredientsContainerEditable from "./IngredientsContainerEditable";

export default function RecipeEditor() {

    const demoIngredient = [
        {
            amount: 250,
            unit: 'gr',
            ingredient: 'Murloc',
        },
        {
            amount: 250000,
            unit: 'Hundepfoten',
            ingredient: 'Murloc',
        }
    ]


    const slides = [
        {url: image_01},
        {url: image_02},
        {url: image_03},
    ]

    const [difficulty, setDifficulty] = useState(1);

    const switchDifficulty = (difficulty) => {
        setDifficulty(difficulty);
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftColumn}>
                <UploadedImages images={slides}/>
                <div className={styles.informationContainer}>
                    <div className={styles.informationContainerChild}>
                        <span className={`material-symbols-outlined ${styles.symbolsDifficulty}  ${styles.active}`}
                              onClick={() => switchDifficulty(1)}>lunch_dining</span>
                        <span
                            className={`material-symbols-outlined ${styles.symbolsDifficulty}  ${(difficulty >= 2 ? styles.active : styles.inactive)}`}
                            onClick={() => switchDifficulty(2)}>lunch_dining</span>
                        <span
                            className={`material-symbols-outlined ${styles.symbolsDifficulty}  ${(difficulty >= 3 ? styles.active : styles.inactive)}`}
                            onClick={() => switchDifficulty(3)}>lunch_dining</span>
                        <span>Schwierigkeit</span>
                    </div>
                    <div className={styles.informationContainerChild}>
                        <span className="material-symbols-outlined">schedule</span>
                        <input className={styles.scheduleInput} type={"number"}/>
                        <span className={styles.scheduleInputText}>Std. </span> <input className={styles.scheduleInput} type={"number"}/> <span className={styles.scheduleInputText}>min.</span>
                    </div>
                </div>
                <div className={styles.ingredientTableWrapper}>
                    <IngredientsContainerEditable ingredientArray={{demoIngredient}}/>
                </div>
            </div>

            <div className={styles.rightColum}>
                <div className={styles.recipeInput}>
                    <label htmlFor={"recipeName"}>Rezeptname</label>
                    <input name={"recipeName"} type={"text"}/>
                </div>
                <div className={styles.recipeInput}>
                    <label htmlFor={"recipeDescription"}>Rezeptbeschreibung</label>
                    <textarea></textarea>
                </div>
            </div>
        </div>
    )

}