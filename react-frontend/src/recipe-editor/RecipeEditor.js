import styles from './RecipeEditor.module.css';
import image_01 from '../recipe-full-view/image-slider/image-01.jpg';
import image_02 from '../recipe-full-view/image-slider/image-02.jpg';
import image_03 from '../recipe-full-view/image-slider/image-03.jpg';
import UploadedImages from './uploadedImages';
import {createContext, useMemo, useState, useEffect} from 'react';
import IngredientsContainerEditable from './IngredientsContainerEditable';
import {postImages, postRecipe} from 'modules/api';
import Modal from '../modules/Modal/Modal';
import {Navigate} from 'react-router-dom';
import {openLoginModal_event} from 'modules/events';

export const RecipeContext = createContext({
	recipe: {
		title: '',
		description: '',
		difficulty: 1,
		rating: 5,
		time: 0,
		ingredients: []
	},
	setRecipe: () => {},
	images: [],
	setImages: () => {}
});

export default function RecipeEditor() {
	const [showModal, setShowModal] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (sessionStorage.getItem('login') === 'false') document.dispatchEvent(openLoginModal_event);
	}, []);

	const slides = [{url: image_01}, {url: image_02}, {url: image_03}];
	const [time, setTime] = useState([0, 0]);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [images, setImages] = useState([]);
	const [recipe, setRecipe] = useState({
		title: '',
		description: '',
		difficulty: 1,
		rating: 5,
		time: 0,
		ingredients: []
	});

	const value = useMemo(() => ({recipe, setRecipe, images, setImages}), [recipe, images]);

	const switchDifficulty = (difficulty) => {
		setRecipe({...recipe, difficulty: difficulty});
	};

	function setTimeToRecipe(event) {
		let value = event.target.value;
		if (event.target.name === 'recipeTimeH') {
			time[0] = value;
		} else {
			time[1] = value;
		}
		setTime([...time]);
		setRecipe({...recipe, time: parseInt(time[0]) * 60 + parseInt(time[1])});
	}

	async function handleSubmit(event) {
		event.preventDefault();
		let imageIds, imageError = null;
		if(images.length > 0) {[imageIds, imageError] = await postImages(images);}
		let [, error] = await postRecipe({...recipe, images: await imageIds});
		if (error || imageError) {
			setError(error + imageError);
			setShowModal(true);
		} else if (error == null && imageError == null) {
			setShowSuccessMessage(true);
		}
	}

	if (sessionStorage.getItem('login') === 'false') {
		return <Navigate to="/" />;
	} else {
		return (
			<RecipeContext.Provider value={value}>
				<form onSubmit={handleSubmit}>
					<Modal show={showSuccessMessage} setShow={setShowSuccessMessage}>
						<h1>Rezept erfolgreich erstellt!</h1>
					</Modal>
					<div className={styles.container}>
						<div className={styles['left-column']}>
							<div className={styles['recipe-input']}>
								<label htmlFor={'recipeName'}>Rezeptname</label>
								<input
									name={'recipeName'}
									type={'text'}
									value={recipe.title}
									onChange={(event) => {
										setRecipe({...recipe, title: event.target.value});
									}}
								/>
							</div>
							<div className={styles['recipe-input']}>
								<label htmlFor={'recipeDescription'}>Rezeptbeschreibung</label>
								<textarea
									name={'recipeDescription'}
									rows={4}
									value={recipe.description}
									onChange={(event) => {
										setRecipe({...recipe, description: event.target.value});
									}}
								></textarea>
							</div>
							<button className={'btn btn-primary hide-mobile hide-tablet'} type="submit">
								Rezept speichern
							</button>
						</div>

						<div className={styles['right-column']}>
							<UploadedImages images={slides} />
							<div className={styles['information-container']}>
								<div className={styles['information-container-child']}>
									<span className={`material-symbols-outlined ${styles['symbols-difficulty']}  ${styles.active}`} onClick={() => switchDifficulty(1)}>
										lunch_dining
									</span>
									<span className={`material-symbols-outlined ${styles['symbols-difficulty']}  ${recipe.difficulty >= 2 ? styles.active : styles.inactive}`} onClick={() => switchDifficulty(2)}>
										lunch_dining
									</span>
									<span className={`material-symbols-outlined ${styles['symbols-difficulty']}  ${recipe.difficulty >= 3 ? styles.active : styles.inactive}`} onClick={() => switchDifficulty(3)}>
										lunch_dining
									</span>
									<span>Schwierigkeit</span>
								</div>
								<div className={styles['information-container-child']}>
									<span className="material-symbols-outlined">schedule</span>
									<input
										name={'recipeTimeH'}
										className={styles['schedule-input']}
										type={'number'}
										value={time[0]}
										onChange={(event) => {
											setTimeToRecipe(event);
										}}
									/>
									<span className={styles['schedule-input-text']}>Std. </span>
									<input
										name={'recipeTimeM'}
										className={styles['schedule-input']}
										type={'number'}
										value={time[1]}
										onChange={(event) => {
											setTimeToRecipe(event);
										}}
									/>
									<span className={styles['schedule-input-text']}>min.</span>
								</div>
							</div>
							<div className={styles['ingredient-table-wrapper']}>
								<IngredientsContainerEditable />
							</div>
							<button className={'btn btn-primary hide-desktop'} type="submit">
								Rezept speichern
							</button>
						</div>
					</div>
				</form>
				<Modal className="error" show={showModal} setShow={setShowModal}>
					{error}
				</Modal>
			</RecipeContext.Provider>
		);
	}
}
