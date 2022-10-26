import './ImageSlider.css';
import {useEffect, useState} from "react";


export default function ImageSlider({slides}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(switchToNextIndex, 5000);
        return () => clearTimeout(timer);
    })

    const switchToNextIndex = () => {
        setCurrentIndex((currentIndex + 1) % slides.length);
    }

    const slideImage = {
        backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)), url(${props.slides[currentIndex].url})`,
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
        <div className='slider'>
            <div className='slide' style={slideImage}>
                <div className='sliderButtons'>{setSliderButtons}</div>
            </div>
        </div>
    )
}