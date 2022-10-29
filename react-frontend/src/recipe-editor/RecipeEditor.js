import styles from './RecipeEditor.module.css';
import IngredientsContainer from "../recipe-full-view/recipe-description/IngredientsContainer";
import image_01 from "../recipe-full-view/image-slider/image-01.jpg";
import image_02 from "../recipe-full-view/image-slider/image-02.jpg";
import image_03 from "../recipe-full-view/image-slider/image-03.jpg";
import UploadedImages from "./uploadedImages";

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

    var difficulty2 = 0;

    const switchDifficulty = (difficulty) =>{
        difficulty2 = difficulty;
        console.log(difficulty2)
            let symbols = document.getElementsByClassName("symbols-difficulty");
            for (let i = 0; i < symbols.length; i++){
                if (difficulty2 >= i){
                    symbols[i].style.color = "black";
                } else {
                    symbols[i].style.color = "lightgrey";
                }
            }
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

                        <span className={`material-symbols-outlined ` + styles.symbolsDifficulty} onClick={() => switchDifficulty(0)} style={{color: difficulty2 > 0 ? 'white' : 'powderblue'}}>lunch_dining</span>
                        <span className={`material-symbols-outlined ` + styles.symbolsDifficulty} onClick={() => switchDifficulty(1)} style={{color: difficulty2 > 1 ? 'white' : 'powderblue'}}>lunch_dining</span>
                        <span className={`material-symbols-outlined ` + styles.symbolsDifficulty} onClick={() => switchDifficulty(2)} style={{color: difficulty2 > 2 ? 'white' : 'powderblue'}}>lunch_dining</span>
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