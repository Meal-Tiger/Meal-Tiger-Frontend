import {postImages, putUser, useGetUser,} from "../modules/api";
import ProfileImageInput from "./profile-image-input/ProfileImageInput";
import Throbber from "../modules/throbber/throbber";
import {useState} from "react";
import styles from "./Profile.module.css"
import Modal from "../modules/Modal/Modal";

function Profile() {
    const [showModal, setShowModal] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [error, setError] = useState(null);
    let [user, errorUser] = useGetUser();
    let [name, setName] = useState("");
    const [image, setImage] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        if (name === "" && user.username !== "") {
            name = user.username;
        }

        let imageId, imageError = null;
        if (image) {
            [imageId, imageError] = await postImages([image]);
            imageId = imageId[0];
        } else if (user.profilePictureId) {
            imageId = user.profilePictureId;
        }
        let error = await putUser({username: name, profilePictureId: imageId});
        if (error || imageError) {
            setError(error ? error : "" + imageError ? imageError : "");
            setShowModal(true);
        } else if (error == null && imageError == null) {
            setShowSuccessMessage(true);
        }
    }

    if (errorUser || error) {
        return (
            <Modal className="error" show={showModal}>{errorUser + error}</Modal>
        );
    } else if (user == null) {
        return (
            <Throbber/>
        );
    } else {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <Modal show={showSuccessMessage} setShow={setShowSuccessMessage}>
                        <h1>Profil erfolgreich gespeichert!</h1>
                    </Modal>
                    <h1>Dein Profil</h1>
                    <div className={styles["input-container"]}>
                        <label htmlFor={"username"}>Nutzername</label>
                        <input id={"username"} placeholder={user.username}
                               onChange={event => setName(event.target.value)}/>
                    </div>

                    <h2>Dein Profilbild</h2>
                    <ProfileImageInput image={image} setImage={setImage} userId={user.userId}
                                       profilePictureId={user.profilePictureId}/>
                    <button className={"btn btn-primary"}>Speichern</button>
                </form>
            </div>
        );
    }
}

export default Profile;