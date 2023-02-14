import styles from'./Navbar.module.css';

import Searchbar from './Searchbar/Searchbar';
import Usermenu from './Usermenu/Usermenu';
import {Link} from "react-router-dom";

function Navbar(){
    return (
        <div className={styles.navbar}>
            <div className={`${styles["navbar-container"]}`}>
                <Link to={"/"} className={styles.logo}>
                    <picture>
                        <source srcSet={"/logo512.webp"} type={"image/webp"}/>
                        <img className={styles.logo} src="/logo512.jpg" alt="Meal-Tiger Logo"/>
                    </picture>
                </Link>
                <Searchbar/>
                <Usermenu/>
            </div>
        </div>
    );
}

export default Navbar;