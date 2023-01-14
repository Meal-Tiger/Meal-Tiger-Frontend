import styles from './Footer.module.css';
import {Link} from "react-router-dom";

export default function Footer(){
    return (
        <footer className={styles.footer}>
            <div className={`${styles["footer-container"]}`}>
                <Link to={"/imprint"}>Impressum</Link>
                •
                <Link to={"/privacy"}>Datenschutz</Link>
            </div>
        </footer>
    )
}