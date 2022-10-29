import styles from './RecipeEditor.module.css';
import IngredientsContainer from "../recipe-full-view/recipe-description/IngredientsContainer";
import image_01 from "../recipe-full-view/image-slider/image-01.jpg";
import image_02 from "../recipe-full-view/image-slider/image-02.jpg";
import image_03 from "../recipe-full-view/image-slider/image-03.jpg";
import UploadedImages from "./uploadedImages";
import {useState} from "react";

export default function RecipeEditor() {


    // const demoIngredient = [
    //     {
    //         amount: 250,
    //         unit: 'gr',
    //         ingredient: 'Murloc',
    //     },
    //     {
    //         amount: 250000,
    //         unit: 'Hundepfoten',
    //         ingredient: 'Murloc',
    //     }
    // ]


    const slides = [
        {url: image_01},
        {url: image_02},
        {url: image_03},
    ]

    const [difficulty, setDifficulty] = useState(0);

    const switchDifficulty = (difficulty) =>{
        setDifficulty(difficulty);
        }


    const mainImage = (image) => {
        return {backgroundImage : `url(${image.url})`}
    }


    return (
        <div className={styles.container}>
            <div>
                <div className={styles.imageContainer}>
                    <div className={styles.mainImage} style={mainImage({url: image_02})}></div>
                    <UploadedImages images={slides}/>
                </div>
                <div className={styles.informationContainer}>
                    <div className={styles.informationContainer}>
                        <span className={`material-symbols-outlined ` + styles.symbolsDifficulty} style={difficulty >= 1 ? {color: 'black'} : {color: 'lightgray'}} onClick={() => switchDifficulty(1)}>lunch_dining</span>
                        <span className={`material-symbols-outlined ` + styles.symbolsDifficulty} style={difficulty >= 2 ? {color: 'black'} : {color: 'lightgray'}} onClick={() => switchDifficulty(2)}>lunch_dining</span>
                        <span className={`material-symbols-outlined ` + styles.symbolsDifficulty} style={difficulty >= 3 ? {color: 'black'} : {color: 'lightgray'}} onClick={() => switchDifficulty(3)}>lunch_dining</span>
                        Schwierigkeit
                    </div>
                    <div className={styles.informationContainer}>
                        <span className="material-symbols-outlined">schedule</span>
                        15 - 30 min
                    </div>
                </div>

            </div>

            <div></div>
        </div>
    )

}