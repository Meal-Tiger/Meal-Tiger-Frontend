import styles from'./Navbar.module.css';
import logo from'./logo.png';

import Searchbar from './Searchbar/Searchbar';
import Usermenu from './Usermenu/Usermenu';
import {Link} from "react-router-dom";

function Navbar(){
    return (
        <div className={styles.navbar}>
            <div className={`${styles["navbar-container"]}`}>
                <Link to={"/"} className={styles.logo}>
                    <img className={styles.logo} src={logo} alt="Meal-Tiger Logo"/>
                </Link>
                <Searchbar/>
                <Usermenu/>
            </div>
        </div>
    );
}

export default Navbar;