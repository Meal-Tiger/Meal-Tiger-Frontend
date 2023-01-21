import styles from './Difficulty.module.css'

export default function Difficulty(props){
    return(
        <div>
            <span className={`material-symbols-outlined ${styles.iconDifficulty}`}>lunch_dining</span>
            <span className={`material-symbols-outlined ${styles.iconDifficulty} ${props.difficulty >= 2 ? styles.active : styles.inactive}`}>lunch_dining</span>
            <span className={`material-symbols-outlined ${styles.iconDifficulty} ${props.difficulty >= 3 ? styles.active : styles.inactive}`}>lunch_dining</span>
        </div>
    )
}