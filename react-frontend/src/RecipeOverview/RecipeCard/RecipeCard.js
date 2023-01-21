import {getFormatedTime, getImageUrl} from 'modules/api.js';
import styles from './RecipeCard.module.css';
import user from './user.png';

export default function RecipeCard(props) {
	return (
		<div onClick={props.onClick} className={styles['recipe-card']}>
			<div
				title={props.title}
				className={`${styles['recipe-card-img']}`}
				style={{backgroundImage: `url(${props.images[0] ? getImageUrl(props.images[0]) : getImageUrl(0)})`}}
			></div>
			<div className={styles['recipe-card-infobox']}>
				<h1 className="titel">{props.title}</h1>
				<div className={styles['recipe-card-info']}>
					<span className="material-symbols-outlined">schedule</span>
					{getFormatedTime(props.time)}
				</div>
				<div className={`${styles['recipe-card-info']} ${'difficulty'}`}>
					<span className="material-symbols-outlined">lunch_dining</span>
					<span className="material-symbols-outlined">lunch_dining</span>
					<span className="material-symbols-outlined">lunch_dining</span>
				</div>
				<div className={` ${styles['recipe-card-info']} ${styles.user}`}>
					<img className={styles.user} src={user} alt=""></img> Benutzername
				</div>
				<div className={`${styles['recipe-card-info']} ${'rating'}`}>
					<span className={'material-symbols-outlined'}>star</span>
					{props.rating}/5
				</div>
			</div>
		</div>
	);
}
