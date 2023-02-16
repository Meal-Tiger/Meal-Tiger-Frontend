import RatingEditor from "./rating-editor/RatingEditor";
import ImageSlider from "./image-slider/ImageSlider";
import RecipeDescription from "./recipe-description/RecipeDescription";
import RatingSection from "./rating-section/RatingSection";
import Modal from "../modules/Modal/Modal";
import {useState} from "react";
import {useParams} from "react-router-dom";
import {useGetRecipe} from "../modules/api";
import Throbber from "../modules/throbber/throbber";

export default function RecipeFullView(){
    let [showModal, setShowModal] = useState(false);
    let {recipeId} = useParams();
    let [recipe] = useGetRecipe(recipeId);

    if (recipe) {
        return (
            <div>
                {recipe.images.length > 0 ?
                    <div>
                        <ImageSlider recipe={recipe} showModal={showModal} setShowModal={setShowModal}/>
                        <Modal show={showModal} setShow={setShowModal} className={"image-modal"} closeButton={true}>
                            <ImageSlider recipe={recipe} showModal={showModal} noLinearGrid={true}/>
                        </Modal>
                    </div>
                :
                    <h1>{recipe.title}</h1>
                }
                <RecipeDescription/>
                <RatingEditor/>
                <RatingSection/>
            </div>
        )
    }else {
        return (<Throbber/>);
    }
}