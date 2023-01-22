import RatingEditor from "./rating-editor/RatingEditor";
import ImageSlider from "./image-slider/ImageSlider";
import RecipeDescription from "./recipe-description/RecipeDescription";
import RatingSection from "./rating-section/RatingSection";
import Modal from "../modules/Modal/Modal";
import {useState} from "react";

export default function RecipeFullView(){
    let [showModal, setShowModal] = useState(false);
    return(
        <div>
            <ImageSlider showModal={showModal} setShowModal={setShowModal}/>
            <Modal show={showModal} setShow={setShowModal} className={"image-modal"}> <ImageSlider noLinearGrid={true}/></Modal>
            <RecipeDescription/>
            <RatingEditor/>
            <RatingSection/>
        </div>
    )
}