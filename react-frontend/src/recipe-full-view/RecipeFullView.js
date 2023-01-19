import CommentEditor from "./CommentEditor/CommentEditor";
import ImageSlider from "./image-slider/ImageSlider";
import RecipeDescription from "./recipe-description/RecipeDescription";

export default function RecipeFullView(){
    return(
        <div>
            <ImageSlider/>
            <RecipeDescription/>
            <CommentEditor/>
        </div>
    )
}