import { deleteImage, getImageUrl, useGetUserImages } from "modules/api"
import {useState} from "react";
import Modal from "modules/Modal/Modal";
import styles from './UserImages.module.css';
import {useNavigate} from 'react-router-dom';

export default function UserImages(){

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false)
    const [deleteID, setDeleteID] = useState(null)

    const [images, error] = useGetUserImages();

    function removeModal(id){
        setShowModal(true);
        setDeleteID(id);
    }

    async function remove(){
        await deleteImage(deleteID);
        setShowModal(false);
        navigate(0);
    }


    let cards = images?.map((id) => {
        return (
        <div key={id} className={styles["deleteCard"]}>
            <img src={getImageUrl(id)} className={styles["image"]}></img>
            <button className={'btn error'} onClick={() => removeModal(id)}>Löschen</button>
        </div>
        )
    })

    return (
    <div>
        <div className={styles["cardBox"]}>
        {cards}
        </div>
        <Modal className={"modal"} show={showModal} setShow={setShowModal}>
                <div className={"highlighted"}>Willst du dein Bild wirklich löschen?</div>
                <div className={styles['button-container']}>
				    <button className={'btn error'} onClick={remove}>Ja</button>
				    <button className={'btn'} onClick={() => setShowModal(false)}>Nein</button>
                </div>
		</Modal>
    </div>
    )
}