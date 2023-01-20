import styles from './RatingSection.module.css';
import {useParams} from 'react-router-dom';
import {useGetRatingsPage} from '../../modules/api';
import Throbber from '../../modules/throbber/throbber';
import Modal from '../../modules/Modal/Modal';

export default function RatingSection() {
	let {recipeId} = useParams();
	let [ratingList, error] = useGetRatingsPage(recipeId, {});

	console.log(ratingList);

	let getRating = () => {
		if (ratingList) {
            return ratingList.ratings.map((element) => {
				return (
					<div className={styles['comment-container']}>
						<div className={styles['comment-left']}>{element.userId}</div>
						<div className={styles['comment-right']}>
							<div>
								<span className="material-symbols-outlined">star</span>
								{element.ratingValue}/5
							</div>
							<div>{element.comment}</div>
						</div>
					</div>
				);
			});
		} else {
			return <Throbber />;
		}
	};

	if (!error) {
		return <div>{getRating()}</div>;
	} else if (error.includes('404')) {
		return (
			<div>
				Für dieses Rezept gibt es bisher keine Bewertungen.
				<br />
				HIER KÖNNTE IHRE BEWERTUNG STEHEN!
			</div>
		);
	} else {
		return (
			<Modal className="error" show={true}>
				{error}
			</Modal>
		);
	}
}
