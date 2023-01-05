import 'material-symbols';
import styles from './Searchbar.module.css';

function Searchbar(){
    return (
            <form className={styles.form}>
                <input type="text" placeholder="Search.."></input>
                <button className={"btn btn-icon"} type="submit"><span className="material-symbols-outlined">search</span></button>
            </form>
        
    );
}

export default Searchbar;