import styles from'./RecipeCard.module.css';

import essen from './essen.jpg';

export default function RecipeCard(){
    return (
        <div className={styles.card}>
            <img src={essen}></img>
            <div className='infobox'>
                <h1 className='titel'>titel</h1>
                <div className='time'><span className="material-symbols-outlined">schedule</span> 15-30 min.</div>
                <div className='difficulty'><span className="material-symbols-outlined">lunch_dining</span><span className="material-symbols-outlined">lunch_dining</span><span className="material-symbols-outlined">lunch_dining</span></div>
                <div className='user'></div>
                <div className='rating'></div>
            </div>
            
        </div>
    );
}