import styles from './Footer.module.css';
import {Link} from "react-router-dom";

export default function Footer(){
    return (
        <footer className={styles.footer}>
            <div className={`${styles["footer-container"]}`}>
                <Link to={"/impressum"}>Impressum</Link>
                •
                <Link to={"/datenschutz"}>Datenschutz</Link>
            </div>
        </footer>
    )
}