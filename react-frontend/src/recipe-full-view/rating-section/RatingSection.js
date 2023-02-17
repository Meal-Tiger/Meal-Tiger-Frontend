import styles from './RatingSection.module.css';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
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

	let navigate = useNavigate();
	let urlPath = useLocation().pathname;
	const handleChange = (newItemsize) => {
		urlPath = (urlPath.split("page/"));
		urlPath = urlPath[0] + "page/0"
		setItemsPerPage(newItemsize);
		navigate(urlPath);
	}

	let getStars = (amount) => {
		return [
			<span style={amount > 0 ? {fontVariationSettings: "'FILL' 1"} : {}}
				  className="material-symbols-outlined">star</span>,
			<span style={amount > 1 ? {fontVariationSettings: "'FILL' 1"} : {}}
				  className="material-symbols-outlined">star</span>,
			<span style={amount > 2 ? {fontVariationSettings: "'FILL' 1"} : {}}
				  className="material-symbols-outlined">star</span>,
			<span style={amount > 3 ? {fontVariationSettings: "'FILL' 1"} : {}}
				  className="material-symbols-outlined">star</span>,
			<span style={amount > 4 ? {fontVariationSettings: "'FILL' 1"} : {}}
				  className="material-symbols-outlined">star</span>
		];
	}

	let getRating = () => {
		if (ratingList && ratingList.ratings) {
			return ratingList.ratings.map((element) => {
				return (
					<div key={element.id} className={styles['rating-container']}>
						<div className={styles['rating-left']}>
							<div>
								<img className={styles['profile-picture']} src={getImageUrl(element.user.profilePictureId)} alt={''}/>
							</div>
							<div>{element.user.username}</div>
						</div>
						<div className={styles['rating-right']}>
							<div>
								{getStars(element.ratingValue)}
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
					<div>{ratingList.totalItems} Kommentare insgesamt</div>
					<div>
						<label htmlFor={"itemsPerPage"}>Kommentare pro Seite </label>
						<select id={"itemsPerPage"} value={itemsPerPage} onChange={(event) => {handleChange(event.target.value)}}>
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
				Loading...
			</div>
			);
		}
	} else if (error.includes('404')) {
		return (
			<div>
				Für dieses Rezept gibt es bisher keine Bewertungen.
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
