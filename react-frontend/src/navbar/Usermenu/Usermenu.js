import {useState} from 'react';
import {openLoginModal_event} from 'modules/events';
import {Link} from 'react-router-dom';

import styles from './Usermenu.module.css';

import Dropdown from 'navbar/Dropdown/Dropdown';

import {logout} from 'modules/oidc';
import {getImageUrl, useGetUser} from '../../modules/api';

export default function Usermenu() {
	const [showDropdown, setShowDropdown] = useState(false);
	const [user, userError] = useGetUser();

	const image = getImageUrl(user ? user.profilePictureId : 0);

	return (
		<div className={styles['usermenu-container']}>
			<div className={styles.usermenu} onClick={() => setShowDropdown(true)}>
				<div className={styles.user} style={{backgroundImage: `url(${image})`}} />
			</div>
			<Dropdown show={showDropdown} setShow={setShowDropdown}>
				<Link to={'/add-recipe'} className={styles['drop-link']}>
					Rezept erstellen
				</Link>
				<Link to={'/profile'} className={` ${sessionStorage.getItem('login') === 'true' ? '' : styles.hide } ${styles['drop-link']}`}>
					Profil
				</Link>
				<Link to={'/'} className={` ${sessionStorage.getItem('login') === 'true' ? '' : styles.hide} ${styles['drop-link']}`} onClick={logout}>
					Logout
				</Link>
				<Link to={''} className={` ${sessionStorage.getItem('login') === 'true' ? styles.hide : ''} ${styles['drop-link']}`} onClick={() => document.dispatchEvent(openLoginModal_event)}>
					Login
				</Link>
			</Dropdown>
		</div>
	);
}
