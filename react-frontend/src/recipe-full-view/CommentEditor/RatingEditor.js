import styles from './RatingEditor.module.css';
import {useState} from 'react';
import {useParams} from "react-router-dom";
import { postRating } from 'modules/api';
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
        let [id, error] = await postRating(recipeId, ratingObject);

        if (error) {
			setError(error);
			setShowModal(true);
		} else if (error == null) {
			setShowSuccessMessage(true);
		}
    }

    return (
        <div className={styles['comment-editor-container']}>
            <h1>Kommentare</h1>
            <div>
                <span className="material-symbols-outlined">star</span>
                <input 
                    type={"number"} 
                    max={5}
                    min={0}
                    value={rating || ""}
                    onChange={(event) => setRating(event.target.value)}>
                </input>
                <span>/5</span>
            </div>
            <div>
                <textarea
                    rows={4}
                    aria-label="Verfasse einen Kommentar für dieses Rezept."
                    placeholder="Verfasse einen Kommentar für dieses Rezept."
                    value={comment || ""}
                    onChange={(event) => setComment(event.target.value)}>
                </textarea>
            </div>
            <div>
                <button
                    onClick={() => {
                        setRating('');
                        setComment('');
                    }}>
                    Abbrechen
                </button>
                <button onClick={(event) => handleSubmit(event)}>Senden</button>
            </div>
            <Modal show={showSuccessMessage} setShow={setShowSuccessMessage}>
                <h1>Rezept erfolgreich erstellt!</h1>
            </Modal>
            <Modal className="error" show={showModal} setShow={setShowModal}>
                {error}
            </Modal>
        </div>
    );
}
