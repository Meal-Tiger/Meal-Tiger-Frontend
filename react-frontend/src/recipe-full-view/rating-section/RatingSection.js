import styles from './RatingSection.module.css';
import {useParams} from "react-router-dom";
import {useGetRatingsPage} from "../../modules/api";

export default function RatingSection(){

    let { recipeId } = useParams();
    let [ratingContainer, error] = useGetRatingsPage(recipeId,{});

    console.log(ratingContainer)


    let rating;

    if (ratingContainer){
        rating = ratingContainer.ratings.map((element) => {
            return (<div className={styles["comment-container"]}>
                <div className={styles["comment-left"]}>
                    {/*{element.}*/}
                </div>
                <div className={styles["comment-right"]}>
                    Sollte rechts sein!
                </div>
            </div>)
        })
    }

    return (
        <div>
            {ratingContainer}
        </div>
    )
}