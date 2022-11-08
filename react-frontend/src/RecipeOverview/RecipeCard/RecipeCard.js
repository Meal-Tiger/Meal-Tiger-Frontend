import styles from'./RecipeCard.module.css';

import essen from './essen.jpg';
import user from './user.png';

export default function RecipeCard(props){
    return (
        <div className={styles.card}>
            <img className={styles.image} src={essen}></img>
            <div className={styles.infobox}>
                <h1 className='titel'>{props.title}</h1>
                <div className='time'><span className="material-symbols-outlined">schedule</span>{props.time} min.</div>
                <div className='difficulty'><span className="material-symbols-outlined">lunch_dining</span><span className="material-symbols-outlined">lunch_dining</span><span className="material-symbols-outlined">lunch_dining</span></div>
                <div className={styles.user}><img className={styles.user} src={user}></img> Benutzername</div>
                <div className='rating'><span class="material-symbols-outlined">star</span>{props.rating}/5</div>
            </div>
            
        </div>
    );
}