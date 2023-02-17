import styles from './ImageSlider.module.css';

import {useEffect, useState} from 'react';

import {getImageUrl} from '../../modules/api';
import {useDrag} from "@use-gesture/react";

export default function ImageSlider(pros) {

	let showModal = pros.showModal;
	let setShowModal = pros.setShowModal;

	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const timer = setTimeout(switchToNextIndex, 5000);
		return () => clearTimeout(timer);
	});

	let getSlides = () => {
		return pros.recipe.images.map((element) =>  getImageUrl(element));
	};

	const switchToNextIndex = () => {
		setCurrentIndex((currentIndex + 1) % getSlides().length);
	};

	const switchToLastIndex = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		} else {
			setCurrentIndex(getSlides().length - 1);
		}

	};

	let slideImage = {
		backgroundImage: `linear-gradient(to right, transparent, white), url(${getSlides()[currentIndex]})`,
		touchAction: "pan-y"
	};

	if (pros.noLinearGrid){
		slideImage = {
			backgroundImage: `url(${getSlides()[currentIndex]})`
		};
	}

	const setSliderButtons = getSlides().map((slide, slideIndex) => (
		<div key={slideIndex} onClick={(event) => {
			setCurrentIndex(slideIndex);
			event.stopPropagation();
		}} style={slideIndex === currentIndex ? {color: 'grey'} : {color: 'white'}}>
			•
		</div>
	));

	const dragBind = useDrag(({swipe: [dx], intentional}) => {
		if (dx && intentional && !showModal) {
			if (dx < 0) {
				switchToNextIndex();
			}

			if (dx > 0) {
				switchToLastIndex();
			}
		}
	}, {swipe: {duration: 2000}, axis: "x"});

	return (
		<div className={styles['slider-container']} onClick={setShowModal}>
			<div className={styles.slider}>
				<div {...dragBind()} className={styles.slide} style={slideImage}>
					<div className={styles['title-container']}>
						<h1 className={styles.title}>{pros.recipe.title}</h1>
					</div>
					<div className={styles['slider-buttons']}>{setSliderButtons}</div>
				</div>
			</div>
		</div>
	);
}
