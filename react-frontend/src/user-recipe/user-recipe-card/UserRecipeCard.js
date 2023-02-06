import styles from './UserRecipeCard.module.css';
import {deleteRecipe, getImageUrl} from '../../modules/api';
import {useNavigate} from 'react-router-dom';
import Modal from '../../modules/Modal/Modal';
import {useState} from 'react';

export default function UserRecipeCard({recipes}) {
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

	const deleteModal = (id) => {
        setDeleteId(id);
		setShowModal(true);
	};

    const deleteRecipeById = async () => {
        await deleteRecipe(deleteId);
        setShowModal(false);
        navigate(0);
    }

	return (
		<div className={styles['recipes-container']}>
			{recipes.recipes.map((recipe) => {
				return (
					<div className={styles['recipe-container']} onClick={() => navigate(`/recipe/${recipe.id}`)}>
						<img className={`${styles['recipe-card-img']}`} src={recipe.images.length > 0 ? getImageUrl(recipe.images[0]) : getImageUrl(0)} alt={'Food image'}></img>
						<div>
							<h1>{recipe.title}</h1>
						</div>
						<div className={styles['button-container']} onClick={(event) => event.stopPropagation()}>
							<button className={'btn error'} type="button" onClick={() => deleteModal(recipe.id)}>
								Löschen
							</button>
							<button className={'btn'} onClick={() => navigate('')}>
								Bearbeiten
							</button>{' '}
							{/*// TODO Link zum Editor einfügen.*/}
						</div>
					</div>
				);
			})}
			<Modal className={"modal"} show={showModal} setShow={setShowModal}>
                <div className={"highlighted"}>Willst du dein Rezept wirklich löschen?</div>
                <div className={styles['button-container']}>
				    <button className={'btn error'} onClick={deleteRecipeById}>Ja</button>
				    <button className={'btn'} onClick={() => setShowModal(false)}>Nein</button>
                </div>
			</Modal>
		</div>
	);
}
