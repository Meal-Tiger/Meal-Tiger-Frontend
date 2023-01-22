import {useState} from 'react';
import { openLoginModal_event } from 'modules/events';
import { Link } from 'react-router-dom';

import styles from './Usermenu.module.css';
import User from './user.png';

import Dropdown from 'navbar/Dropdown/Dropdown';

import { logout } from 'modules/oidc';

export default function Usermenu() {
	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<div className={styles["usermenu-container"]}>
			<div className={styles.usermenu} onClick={() => setShowDropdown(true)}>
				<img className={styles.user} src={User} alt="User menu"></img>
			</div>
			<Dropdown show={showDropdown} setShow={setShowDropdown}>
				<Link to={"/add-recipe"} className={styles["drop-link"]} >
					Rezept erstellen
				</Link>
				<Link to={"/profile"} className={` ${sessionStorage.getItem("login") === "true" ? "" : styles.hide } ${styles["drop-link"]}`}>
					Profile
				</Link>
				<Link to={"/"} className={` ${sessionStorage.getItem("login") === "true" ? "" : styles.hide } ${styles["drop-link"]}`} onClick={logout}>
					Logout
				</Link>
				<Link to={""} className={` ${sessionStorage.getItem("login") === "true" ? styles.hide : ""} ${styles["drop-link"]}`} onClick={() => document.dispatchEvent(openLoginModal_event)}>
					Login
				</Link>
			</Dropdown>
		</div>
	);
}