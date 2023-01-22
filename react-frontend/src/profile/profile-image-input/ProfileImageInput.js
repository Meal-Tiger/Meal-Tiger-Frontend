import styles from "./ProfileImageInput.module.css"
import {getImageUrl} from "../../modules/api";

export default function ProfileImageInput(props) {

    let {image, setImage} = props;

    function img() {
        if (image) {
            return (
                <label htmlFor={"uploadImage"}>
                    <img className={styles["profile-image-input"]} src={URL.createObjectURL(image)} alt=""/>
                </label>
            )
        } else if (props.profilePictureId) {
            return (
                <label htmlFor={"uploadImage"}>
                    <img className={styles["profile-image-input"]} src={getImageUrl(props.profilePictureId)} alt=""/>
                </label>
            )
        } else {
            return <label htmlFor={"uploadImage"}>Du hast momentan noch kein Profilbild hochgeladen.</label>
        }
    }

    return (
        <div className={styles['upload-container']}>
            {img()}
            <input id={"uploadImage"} multiple={false} type='file' accept="image/*"
                   onChange={event => setImage(event.target.files[0])}/>
        </div>
    )
}
