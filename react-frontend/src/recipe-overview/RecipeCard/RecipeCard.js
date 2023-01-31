import {getFormatedTime, getImageUrl} from 'modules/api.js';
import Difficulty from 'modules/Difficulty/Difficulty';
import styles from './RecipeCard.module.css';

export default function RecipeCard(props) {

	if(props.images.length > 0){
		return (
			<div onClick={props.onClick} className={styles['recipe-card']}>
			<div
				title={props.title}
				className={`${styles['recipe-card-img']}`}
				style={{backgroundImage: `url(${getImageUrl(props.images[0])}`}}
			></div>
			<div className={styles['recipe-card-infobox']}>
				<h3 className="titel">{props.title}</h3>
				<div className={styles['recipe-card-info']}>
					<span className="material-symbols-outlined">schedule</span>
					{getFormatedTime(props.time)}
				</div>
				<Difficulty difficulty={props.difficulty}/>
				<div className={` ${styles['recipe-card-info']} ${styles.user}`}>
					<div className={` ${props.user.profilePictureId !== null ? styles.user : "" }`} style={{backgroundImage: `url(${getImageUrl(props.user.profilePictureId)}`}}></div> <span>{props.user.username}</span>
				</div>
				<div className={`${styles['recipe-card-info']} ${'rating'}`}>
					<span className={'material-symbols-outlined'}>star</span>
					{props.rating}/5
				</div>
			</div>
		</div>
		)
	}
	else {
		return (
			<div onClick={props.onClick} className={styles['recipe-card']}>
				<div className={styles['recipe-card-infobox']}>
					<h1 className="titel">{props.title}</h1>
					<div className={styles['recipe-card-info']}>
						<span className="material-symbols-outlined">schedule</span>
						{getFormatedTime(props.time)}
					</div>
					<Difficulty difficulty={props.difficulty}/>
					<div className={` ${styles['recipe-card-info']} ${styles.user}`}>
						<img className={styles.user} src={getImageUrl(props.user.imageId)} alt=""></img> {props.user.username}
					</div>
					<div className={`${styles['recipe-card-info']} ${'rating'}`}>
						<span className={'material-symbols-outlined'}>star</span>
						{props.rating}/5
					</div>
				</div>
			</div>
		);
	}

}
