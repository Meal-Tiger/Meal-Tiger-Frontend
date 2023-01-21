import styles from './ImageSlider.module.css';

import {useEffect, useState} from 'react';

import {useParams} from 'react-router-dom';
import {getImageUrl, useGetRecipe} from '../../modules/api';
import Throbber from '../../modules/throbber/throbber';

export default function ImageSlider() {
	let {recipeId} = useParams();
	let [recipe] = useGetRecipe(recipeId);

	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const timer = setTimeout(switchToNextIndex, 5000);
		return () => clearTimeout(timer);
	});

	let getSlides = () => {
		if (recipe)
			return recipe.images.map((element) =>  getImageUrl(element));
		else
			return [];
	};

	const switchToNextIndex = () => {
		setCurrentIndex((currentIndex + 1) % getSlides().length);
	};

	const slideImage = {
		backgroundImage: `linear-gradient(to right, transparent, white), url(${getSlides()[currentIndex]})`
	};

	const setSliderButtons = getSlides().map((slide, slideIndex) => (
		<div key={slideIndex} onClick={() => setCurrentIndex(slideIndex)} style={slideIndex === currentIndex ? {color: 'grey'} : {color: 'white'}}>
			•
		</div>
	));

	if (recipe) {
		return (
			<div className={styles['slider-container']}>
				<div className={styles.slider}>
					<div className={styles.slide} style={slideImage}>
						<div className={styles['title-container']}>
							<h1 className={styles.title}>{recipe.title}</h1>
						</div>
						<div className={styles['slider-buttons']}>{setSliderButtons}</div>
					</div>
				</div>
			</div>
		);
	} else {
		return <Throbber />;
	}
}
