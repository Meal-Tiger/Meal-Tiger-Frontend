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
	const [showModal, setShowModal] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);

	function setMenu(bool){
		if(localStorage.getItem('access_token')) setShowDropdown(bool)
		else setShowModal(bool);
	}

	useEvent("login", () => setShowModal(false));

	return (
		<div className={styles.usermenu} onClick={() => setMenu(true)}>
			<img className={styles.user} src={User} alt="User menu"></img>

			<Dropdown show={showDropdown} setShow={setShowDropdown}>
				<Link to="/add-recipe"><button>Rezept erstellen</button></Link>
				<button onClick={logout}>Logout</button>
			</Dropdown>

			<Modal show={showModal} setShow={setShowModal}>
				<h1>Login</h1>
                <LoginWithKeycloak/>
			</Modal>
		</div>
	);
}