import RatingEditor from "./rating-editor/RatingEditor";
import ImageSlider from "./image-slider/ImageSlider";
import RecipeDescription from "./recipe-description/RecipeDescription";
import RatingSection from "./rating-section/RatingSection";

export default function RecipeFullView(){
    return(
        <div>
            <ImageSlider/>
            <RecipeDescription/>
            <RatingEditor/>
            <RatingSection/>
        </div>
    )
}