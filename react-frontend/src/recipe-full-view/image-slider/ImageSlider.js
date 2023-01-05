import styles  from './ImageSlider.module.css';

import {useEffect, useState} from "react";

import image_01 from './image-01.jpg';
import image_02 from './image-02.jpg';
import image_03 from './image-03.jpg';

export default function ImageSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(switchToNextIndex, 5000);
        return () => clearTimeout(timer);
    })

    const slides = [
        {url: image_01},
        {url: image_02},
        {url: image_03},
    ]

    const switchToNextIndex = () => {
        setCurrentIndex((currentIndex + 1) % slides.length);
    }

    const slideImage = {
        backgroundImage: `linear-gradient(to right, transparent, white), url(${slides[currentIndex].url})`,
    }

    const setSliderButtons = slides.map(
        (slide, slideIndex) => (
            <div key={slideIndex}
                 onClick={() => setCurrentIndex(slideIndex)}
                 style={slideIndex === currentIndex ? {color: 'grey'} : {color: 'white'}}
            >•</div>
        )
    )

    return (
        <div className={styles["slider-container"]}>
            <div className={styles.slider}>
                <div className={styles.slide} style={slideImage}>
                    <div className={styles["title-container"]}>
                        <h1 className={styles.title}>Zufallsgericht</h1>
                    </div>
                    <div className={styles["slider-buttons"]}>{setSliderButtons}</div>
                </div>
            </div>
        </div>
    )
}