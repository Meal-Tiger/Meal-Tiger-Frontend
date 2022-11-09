import styles from'./Usermenu.module.css'
import User from'./user.png'

function Usermenu(){
    return (
        <img className={styles.user} src={User} alt="User menu"></img>
    );
}

export default Usermenu;