import styles from'./Navbar.module.css';
import logo from'./logo.png';

import Searchbar from './Searchbar/Searchbar';
import Usermenu from './Usermenu/Usermenu';

function Navbar(){
    return (
        <div className={styles.navbar}>
            <img className={styles.logo} src={logo} alt="Meal-Tiger Logo"></img>
            <Searchbar/>
            <Usermenu/>
        </div>
    );
}

export default Navbar;