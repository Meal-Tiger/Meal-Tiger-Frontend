import './ImageSlider.css';
import {useEffect, useState} from "react";


export default function ImageSlider(props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slideImage = {
        backgroundImage: `url(${props.slides[currentIndex].url})`,
    }

    const switchToOne = () => {
        setCurrentIndex((currentIndex + 1) % props.slides.length);
    }

    useEffect(() => {
        setTimeout(switchToOne, 5000)
    })

    return (
        <div className='slider'>
            <div className='slide' style={slideImage}>
            </div>
            <div>
                <button onClick={switchToOne}></button>
                <div/>
            </div>
        </div>
    )
}


