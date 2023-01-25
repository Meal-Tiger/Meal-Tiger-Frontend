import styles from './RatingSection.module.css';
import {useParams} from 'react-router-dom';
import {getImageUrl, useGetRatingsPage} from '../../modules/api';
import Throbber from '../../modules/throbber/throbber';
import Modal from '../../modules/Modal/Modal';
import Pagination from "../../modules/pagination/pagination";
import {useState} from "react";

export default function RatingSection() {
	let {recipeId} = useParams();
	let {page} = useParams();
	const [itemsPerPage, setItemsPerPage] = useState(15);

	let [ratingList, error] = useGetRatingsPage(recipeId, {size: itemsPerPage, page:page});


	let getRating = () => {
		if (ratingList && ratingList.ratings) {
			return ratingList.ratings.map((element) => {
				return (
					<div key={element.id} className={styles['rating-container']}>
						<div className={styles['rating-left']}>
							<div>
								<img className={styles['profile-picture']} src={getImageUrl(element.user.profilePictureId)} alt={'Food'}/>
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
		if (ratingList && ratingList.ratings){
			return <div>
				<div className={styles["filter-top"]}>
					<div>{ratingList.totalItems} Kommentare insgesammt</div>
					<div>
						<label htmlFor={"itemsPerPage"}>Anzahl Kommentare pro Seite </label>
						<select id={"itemsPerPage"} value={itemsPerPage} onChange={(event) => {setItemsPerPage(event.target.value)}}>
							<option>15</option>
							<option>50</option>
							<option>100</option>
						</select>
					</div>
				</div>
				{getRating()}
				<Pagination paginationObject={{object: ratingList,error: error}}/>
			</div>;
		}else{
			return(
			<div>
				Loding
			</div>
			);
		}
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
