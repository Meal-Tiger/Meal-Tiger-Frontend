import {useState} from 'react';
import {openLoginModal_event} from 'modules/events';
import {Link} from 'react-router-dom';

import styles from './Usermenu.module.css';

import Dropdown from 'navbar/Dropdown/Dropdown';

import {logout} from 'modules/oidc';
import {getImageUrl, useGetUser} from '../../modules/api';

export default function Usermenu() {
	const [showDropdown, setShowDropdown] = useState(false);
	const [user] = useGetUser();

	const image = getImageUrl(user?.profilePictureId);

	return (
		<div className={styles['usermenu-container']}>
			<div className={styles.usermenu} onClick={() => setShowDropdown(true)}>
				<div className={styles.user} style={{backgroundImage: `url(${image})`}} />
			</div>
			<Dropdown show={showDropdown} setShow={setShowDropdown}>
				<Link to={'/add-recipe'} className={styles['drop-link']}>
					<div className={styles['drop-link-container']}>
						<span className={'material-symbols-outlined'}>post_add</span>
						<div>Rezept erstellen</div>
					</div>
				</Link>
				<Link to={'/my-recipes'} className={` ${sessionStorage.getItem('login') === 'true' ? '' : styles.hide} ${styles['drop-link']}`}>
					<div className={styles['drop-link-container']}>
						<span className={'material-symbols-outlined'}>menu_book</span>
						<div>Meine Rezepte</div>
					</div>
				</Link>
				<Link to={'/my-images'} className={` ${sessionStorage.getItem('login') === 'true' ? '' : styles.hide} ${styles['drop-link']}`}>
					<div className={styles['drop-link-container']}>
						<span className={'material-symbols-outlined'}>image</span>
						<div>Meine Bilder</div>
					</div>
				</Link>
				<Link to={'/profile'} className={` ${sessionStorage.getItem('login') === 'true' ? '' : styles.hide} ${styles['drop-link']}`}>
					<div className={styles['drop-link-container']}>
						<span className={'material-symbols-outlined'}>person</span>
						<div>Profil</div>
					</div>
				</Link>
				<Link to={'/'} className={` ${sessionStorage.getItem('login') === 'true' ? '' : styles.hide} ${styles['drop-link']}`} onClick={logout}>
					<div className={styles['drop-link-container']}>
						<span className={'material-symbols-outlined'}>logout</span>
						<div>Logout</div>
					</div>
				</Link>
				<Link to={''} className={` ${sessionStorage.getItem('login') === 'true' ? styles.hide : ''} ${styles['drop-link']}`} onClick={() => document.dispatchEvent(openLoginModal_event)}>
					<div className={styles['drop-link-container']}>
						<span className={'material-symbols-outlined'}>login</span>
						<div>Login</div>
					</div>
				</Link>
			</Dropdown>
		</div>
	);
}
