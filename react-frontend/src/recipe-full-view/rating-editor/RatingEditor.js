import styles from './RatingEditor.module.css';
import {useState} from 'react';
import {useParams} from "react-router-dom";
import { putRating } from 'modules/api';
import Modal from "../../modules/Modal/Modal";

export default function RatingEditor() {
    const [rating, setRating] = useState();
    const [comment, setComment] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [error, setError] = useState(null);

    let {recipeId} = useParams();
    
    async function handleSubmit(event) {
        event.preventDefault();

        let ratingObject = {rating: parseInt(rating), comment}
        let error = await putRating(recipeId, ratingObject);

        if (error) {
			setError(error);
			setShowModal(true);
		} else if (error == null) {
			setShowSuccessMessage(true);
		}
    }

    return (
        <div className={styles['comment-editor-container']}>
            <h2>Kommentare</h2>
            <div className={styles['star-line']}>
                <span className="material-symbols-outlined">star</span>
                <input 
                    type={"number"} 
                    max={5}
                    min={1}
                    value={rating || ""}
                    onChange={(event) => setRating(event.target.value)}>
                </input>
                <span>/5</span>
            </div>
            <div className={styles['comment-editor-bottom']}>
                <textarea
                    rows={4}
                    aria-label="Verfasse einen Kommentar für dieses Rezept."
                    placeholder="Verfasse einen Kommentar für dieses Rezept."
                    value={comment || ""}
                    onChange={(event) => setComment(event.target.value)}>
                </textarea>
                <div className={styles['comment-editor-buttons']}>
                    <button className={"btn btn-primary"}
                        onClick={() => {
                            setRating('');
                            setComment('');
                        }}>
                        Abbrechen
                    </button>
                    <button className={"btn btn-primary"} onClick={(event) => handleSubmit(event)}>Senden</button>
                </div>
            </div>
            <Modal show={showSuccessMessage} setShow={setShowSuccessMessage}>
                <h1>Dein Kommentar wurde hinzugefügt.</h1>
            </Modal>
            <Modal className="error" show={showModal} setShow={setShowModal}>
                {error}
            </Modal>
        </div>
    );
}
