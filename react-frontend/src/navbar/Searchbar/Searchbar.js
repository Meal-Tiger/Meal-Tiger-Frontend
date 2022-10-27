import 'material-symbols';
import styles from './Searchbar.module.css';

function Searchbar(){
    return (
        <div>
            <form className={styles.form}>
                <input className={styles.input} type="text" placeholder="Search.."></input>
                <button className={styles.button} type="submit"><span className="material-symbols-outlined">search</span></button>
            </form>
        </div>
        
    );
}

export default Searchbar;