import styles from './RecipeDescription.module.css';

import IngredientsContainer from './IngredientsContainer';
import {useGetRecipe, getFormatedTime} from '../../modules/api';
import {useParams} from 'react-router-dom';
import Throbber from '../../modules/throbber/throbber';
import Modal from "../../modules/Modal/Modal";
import Difficulty from 'modules/Difficulty/Difficulty';

export default function RecipeDescription() {
	let {recipeId} = useParams();
	let [recipe, error] = useGetRecipe(recipeId);

	if (recipe) {
		return (
			<div className={styles.descriptionGrid}>
				<div className={styles.iconContainer}>
					<div className={styles.informationContainer}>
						<div className={styles.informationContainer}>
							<span className="material-symbols-outlined">person</span>
							{recipe.user.username}
						</div>
						<div className={styles.informationContainer}>
							<span className="material-symbols-outlined">star</span>
							{recipe.rating} / 5
						</div>
					</div>
					<div className={styles.informationContainer}>
						<div className={styles.informationContainer}>
							<Difficulty difficulty = {recipe.difficulty}/>
							Schwierigkeit
						</div>
						<div className={styles.informationContainer}>
							<span className="material-symbols-outlined">schedule</span>
							{getFormatedTime(recipe.time)}
						</div>
					</div>
				</div>
				<IngredientsContainer ingredientArray={recipe.ingredients} />
				<div className={styles["desc-container"]}>
					<h2>Rezeptbeschreibung</h2>
					<p>{recipe.description}</p>
				</div>
			</div>
		);
	} else if (error) {
		return (
			<Modal className="error" show={true}>
				{error}
			</Modal>
		);
	} else {
		return <Throbber />;
	}
}
