import styles from './RatingSection.module.css';
import {useParams} from "react-router-dom";
import {useGetRatingsPage} from "../../modules/api";

export default function RatingSection(){

    let { recipeId } = useParams();
    let [ratingContainer, error] = useGetRatingsPage(recipeId,{});

    let rating;

    if (ratingContainer){
        rating = ratingContainer.ratings.map((element) => {
            return (<div className={styles["comment-container"]}>
                <div className={styles["comment-left"]}>
                    {element.toString()}
                </div>
                <div className={styles["comment-right"]}>
                    Sollte rechts sein!
                </div>
            </div>)
        })
    }

    return (
        <div>
            {rating}
        </div>
    )
}