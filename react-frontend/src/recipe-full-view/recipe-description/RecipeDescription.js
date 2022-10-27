import styles from './RecipeDescription.module.css';

import IngredientsContainer from "./IngredientsContainer";

export default function RecipeDescription() {

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

    const demoDescription = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   
Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,`

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
                        3 / 5
                    </div>
                </div>
                <div className={styles.informationContainer}>
                    <div className={styles.informationContainer}>
                        <span className="material-symbols-outlined">lunch_dining</span>
                        <span className="material-symbols-outlined">lunch_dining</span>
                        <span className="material-symbols-outlined">lunch_dining</span>
                        Schwierigkeit
                    </div>
                    <div className={styles.informationContainer}>
                        <span className="material-symbols-outlined">schedule</span>
                        15 - 30 min
                    </div>
                </div>
            </div>
            <IngredientsContainer ingredientArray={demoIngredient}/>
            <div>
                <h2>Rezeptbeschreibung</h2>
                <p>{demoDescription}</p>
            </div>
        </div>
    )
}