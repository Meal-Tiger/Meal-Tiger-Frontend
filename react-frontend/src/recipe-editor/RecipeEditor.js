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
				<div className={styles.leftColumn}>
					<UploadedImages images={slides} />
					<div className={styles.informationContainer}>
						<div className={styles.informationContainerChild}>
							<span className={`material-symbols-outlined ${styles.symbolsDifficulty}  ${styles.active}`} onClick={() => switchDifficulty(1)}>
								lunch_dining
							</span>
							<span className={`material-symbols-outlined ${styles.symbolsDifficulty}  ${difficulty >= 2 ? styles.active : styles.inactive}`} onClick={() => switchDifficulty(2)}>
								lunch_dining
							</span>
							<span className={`material-symbols-outlined ${styles.symbolsDifficulty}  ${difficulty >= 3 ? styles.active : styles.inactive}`} onClick={() => switchDifficulty(3)}>
								lunch_dining
							</span>
							<span>Schwierigkeit</span>
						</div>
						<div className={styles.informationContainerChild}>
							<span className="material-symbols-outlined">schedule</span>
							<input name={'recipeTimeH'} className={styles.scheduleInput} type={'number'} />
							<span className={styles.scheduleInputText}>Std. </span>
							<input name={'recipeTimeM'} className={styles.scheduleInput} type={'number'} />
							<span className={styles.scheduleInputText}>min.</span>
						</div>
					</div>
					<div className={styles.ingredientTableWrapper}>
						<IngredientsContainerEditable ingredientArray={{demoIngredient}} />
					</div>
				</div>

				<div className={styles.rightColumn}>
					<div className={styles.recipeInput}>
						<label htmlFor={'recipeName'}>Rezeptname</label>
						<input name={'recipeName'} type={'text'} />
					</div>
					<div className={styles.recipeInput}>
						<label htmlFor={'recipeDescription'}>Rezeptbeschreibung</label>
						<textarea name={'recipeDescription'}></textarea>
					</div>
					<button className={`${styles.btn} ${styles.btnSubmit}`} type="submit">
						Rezept speichern
					</button>
				</div>
			</div>
		</form>
	);
}
