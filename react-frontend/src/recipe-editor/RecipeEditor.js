import styles from './RecipeEditor.module.css';
import image_01 from '../recipe-full-view/image-slider/image-01.jpg';
import image_02 from '../recipe-full-view/image-slider/image-02.jpg';
import image_03 from '../recipe-full-view/image-slider/image-03.jpg';
import UploadedImages from './uploadedImages';
import {useState} from 'react';
import IngredientsContainerEditable from './IngredientsContainerEditable';
import { postRecipe } from 'modules/api';

export default function RecipeEditor() {
	const demoIngredient = [
		{
			amount: 250,
			unit: 'gr',
			ingredient: 'Murloc'
		},
		{
			amount: 250000,
			unit: 'Hundepfoten',
			ingredient: 'Murloc'
		}
	];

	const slides = [{url: image_01}, {url: image_02}, {url: image_03}];

	const [difficulty, setDifficulty] = useState(1);

	const switchDifficulty = (difficulty) => {
		setDifficulty(difficulty);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		console.log(event.target.elements);

		var ingredients = Array.from(event.target.elements)
			.filter((element) => element.className.includes('ingredientItem'))
			.reduce((group, item) => {
				const index = item.dataset.index;
				group[index] = group[index] ?? {};
				group[index][item.name] = item.value;
				return group;
			}, [])
            .map(item => {

                const match = item.amountUnit.match(/([0-9]+)\s*(\S*)/)
                return {
                    name: item.name,
                    unit: match[2],
                    amount: match[1]
                }
            });

		const recipe = {
			title: event.target.elements.namedItem('recipeName').value,
			description: event.target.elements.namedItem('recipeDescription').value,
			difficulty: difficulty,
			rating: 5,
			time: event.target.elements.namedItem('recipeTimeH').value * 60 + event.target.elements.namedItem('recipeTimeM').value,
			ingredients: ingredients
		};

        postRecipe(recipe);
		console.log(recipe);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className={styles.container}>
				<div className={styles["left-column"]}>
					<UploadedImages images={slides} />
					<div className={styles["information-container"]}>
						<div className={styles["information-container-child"]}>
							<span className={`material-symbols-outlined ${styles["symbols-difficulty"]}  ${styles.active}`} onClick={() => switchDifficulty(1)}>
								lunch_dining
							</span>
							<span className={`material-symbols-outlined ${styles["symbols-difficulty"]}  ${difficulty >= 2 ? styles.active : styles.inactive}`} onClick={() => switchDifficulty(2)}>
								lunch_dining
							</span>
							<span className={`material-symbols-outlined ${styles["symbols-difficulty"]}  ${difficulty >= 3 ? styles.active : styles.inactive}`} onClick={() => switchDifficulty(3)}>
								lunch_dining
							</span>
							<span>Schwierigkeit</span>
						</div>
						<div className={styles["information-container-child"]}>
							<span className="material-symbols-outlined">schedule</span>
							<input name={'recipeTimeH'} className={styles["schedule-input"]} type={'number'} />
							<span className={styles["schedule-input-text"]}>Std. </span>
							<input name={'recipeTimeM'} className={styles["schedule-input"]} type={'number'} />
							<span className={styles["schedule-input-text"]}>min.</span>
						</div>
					</div>
					<div className={styles["ingredient-table-wrapper"]}>
						<IngredientsContainerEditable ingredientArray={{demoIngredient}} />
					</div>
				</div>

				<div className={styles["right-column"]}>
					<div className={styles["recipe-input"]}>
						<label htmlFor={'recipeName'}>Rezeptname</label>
						<input name={'recipeName'} type={'text'} />
					</div>
					<div className={styles["recipe-input"]}>
						<label htmlFor={'recipeDescription'}>Rezeptbeschreibung</label>
						<textarea name={'recipeDescription'} rows={4}></textarea>
					</div>
					<button className={"btn btn-primary"} type="submit">
						Rezept speichern
					</button>
				</div>
			</div>
		</form>
	);
}
