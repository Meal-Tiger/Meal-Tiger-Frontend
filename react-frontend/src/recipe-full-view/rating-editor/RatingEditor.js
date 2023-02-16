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

    let getStars = () => {
        return [
            <span style={rating > 0 ? {fontVariationSettings: "'FILL' 1"} : {}}
                  className="material-symbols-outlined"
                  onClick={() => setRating(1)}>star</span>,
            <span style={rating > 1 ? {fontVariationSettings: "'FILL' 1"} : {}}
                  className="material-symbols-outlined"
                  onClick={() => setRating(2)}>star</span>,
            <span style={rating > 2 ? {fontVariationSettings: "'FILL' 1"} : {}}
                  className="material-symbols-outlined"
                  onClick={() => setRating(3)}>star</span>,
            <span style={rating > 3 ? {fontVariationSettings: "'FILL' 1"} : {}}
                  className="material-symbols-outlined"
                  onClick={() => setRating(4)}>star</span>,
            <span style={rating > 4 ? {fontVariationSettings: "'FILL' 1"} : {}}
                  className="material-symbols-outlined"
                  onClick={() => setRating(5)}>star</span>
        ];
    }

    return (
        <div className={styles['comment-editor-container']}>
            <h2>Kommentare</h2>
            <div className={styles['star-line']}>
                {getStars()}
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
