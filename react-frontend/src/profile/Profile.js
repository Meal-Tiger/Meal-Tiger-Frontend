import {postImages, postUser, putUser, useGetUser,} from "../modules/api";
import ProfileImageInput from "./profile-image-input/ProfileImageInput";
import Throbber from "../modules/throbber/throbber";
import {useState} from "react";
import styles from "./Profile.module.css"
import Modal from "../modules/Modal/Modal";

function Profile() {
    const [showModal, setShowModal] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [errorUser, setErrorUser] = useState(null);
    let [user, error, status] = useGetUser();

    let [name, setName] = useState("");
    const [image, setImage] = useState(null);

    async function handleSubmit(event, bPutUser) {
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

        let error = null;
        if (bPutUser) error = await putUser({username: name, profilePictureId: imageId});
        else error = await postUser({username: name, profilePictureId: imageId});

        if (error || imageError) {
            setErrorUser(error ? error : "" + imageError ? imageError : "");
            setShowModal(true);
        } else if (error == null && imageError == null) {
            setShowSuccessMessage(true);
        }
    }

    if (errorUser || status !== 404 && status !== 200) {
        return (
            <Modal className="error" show={showModal}>{errorUser + error}</Modal>
        );
    } else if (status === 404) {
        return (
            <div>
                <form onSubmit={(event) => handleSubmit(event, false)}>
                    <Modal show={showSuccessMessage} setShow={setShowSuccessMessage}>
                        <h1>Profil erfolgreich erstellt!</h1>
                    </Modal>
                    <h1>Erstelle dein Profil</h1>
                    <div className={styles["input-container"]}>
                        <label htmlFor={"username"}>Nutzername</label>
                        <input id={"username"} placeholder={"Dein Username"} required
                               onChange={event => setName(event.target.value)}/>
                    </div>

                    <h2>Dein Profilbild</h2>
                    <ProfileImageInput image={image} setImage={setImage} userId={undefined}
                                       profilePictureId={undefined}/>
                    <button className={"btn btn-primary"}>Profil erstellen</button>
                </form>
            </div>
        );
    } else if (user == null) {
        return (
            <Throbber/>
        );
    } else {
        return (
            <div>
                <form onSubmit={(event) => handleSubmit(event, true)}>
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