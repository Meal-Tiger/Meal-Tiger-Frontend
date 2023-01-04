import {useState} from 'react';
import { useEvent } from 'modules/events';
import { Link } from 'react-router-dom';

import styles from './Usermenu.module.css';
import User from './user.png';

import Modal from '../../modules/Modal/Modal';
import LoginWithKeycloak from './LoginWithKeycloak/LoginWithKeycloak';
import Dropdown from 'navbar/Dropdown/Dropdown';

import { logout } from 'modules/oidc';

export default function Usermenu() {
	const [userIsLoggedIn, setUserIsLoggedIn] = useState(false)
	const [showModal, setShowModal] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);

	function setMenu(bool){
		setShowDropdown(bool)
	}

	useEvent("login", () =>
		{
			setShowModal(false);
			setUserIsLoggedIn(true);
		}
	);

	return (
		<div className={styles["usermenu-container"]}>
			<div className={styles.usermenu} onClick={() => setMenu(true)}>
				<img className={styles.user} src={User} alt="User menu"></img>
			</div>
			<Dropdown show={showDropdown} setShow={setShowDropdown}>
				<Link to={userIsLoggedIn ? "/add-recipe" : "" } className={styles["drop-link"]} onClick={() => userIsLoggedIn ? "" : setShowModal(true)}>
					Rezept erstellen
				</Link>
				<Link to={"/"} className={` ${userIsLoggedIn ? "" : styles.hide } ${styles["drop-link"]}`} onClick={logout}>
					Logout
				</Link>
				<Link to={""} className={` ${userIsLoggedIn ? styles.hide : ""} ${styles["drop-link"]}`} onClick={() => setShowModal(true)}>
					Login
				</Link>
			</Dropdown>

			<Modal show={showModal} setShow={setShowModal}>
				<h1>Login</h1>
				<LoginWithKeycloak/>
			</Modal>
		</div>
	);
}