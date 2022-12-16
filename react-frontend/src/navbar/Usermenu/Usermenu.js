import {useState} from 'react';
import { useEvent } from 'modules/events';

import styles from './Usermenu.module.css';
import User from './user.png';

import Modal from '../../modules/Modal/Modal';
import LoginWithKeycloak from './LoginWithKeycloak/LoginWithKeycloak';

export default function Usermenu() {
	const [show, setShow] = useState(false);

	useEvent("login", () => setShow(false));


	return (
		<div className={styles.usermenu} onClick={() => setShow(true)}>
			<img className={styles.user} src={User} alt="User menu"></img>
			<Modal show={show} setShow={setShow}>
				<h1>Login</h1>
                <LoginWithKeycloak/>
			</Modal>
		</div>
	);
}