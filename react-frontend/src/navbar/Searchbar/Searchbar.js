import { useNavigate } from 'react-router-dom';

import 'material-symbols';
import styles from './Searchbar.module.css';

function Searchbar(){

    let navigate = useNavigate();

    function search(e){
        e.preventDefault();
        if (e.target[0].value !== ""){
            navigate(`/search/${e.target[0].value}`)
        }
    }

    return (
            <form className={styles.form} onSubmit={search}>
                <input type="text" placeholder="Search.."></input>
                <button className={"btn btn-icon"} type="submit"><span className="material-symbols-outlined">search</span></button>
            </form>
        
    );
}

export default Searchbar;