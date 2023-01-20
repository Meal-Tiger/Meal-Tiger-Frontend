import styles from './RatingSection.module.css';
import {useParams} from 'react-router-dom';
import {getImageUrl, useGetRatingsPage} from '../../modules/api';
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
					<div className={styles['rating-container']}>
						<div className={styles['rating-left']}>
							<div>
								<img className={styles['profile-picture']} src={getImageUrl(element.user.picture)} alt={'Food'}/>
							</div>
							<div>{element.user.username}</div>
						</div>
						<div className={styles['rating-right']}>
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
