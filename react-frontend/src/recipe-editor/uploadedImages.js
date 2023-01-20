import styles from './RecipeEditor.module.css';
import {useContext} from "react";
import {RecipeContext} from "./RecipeEditor";

export default function UploadedImages() {

    const {images, setImages} = useContext(RecipeContext);

    const handleChange = (event) => {
        if (event.target.files.length === 0) {
            return;
        }
        for (let i = 0; i < event.target.files.length; i++) {
            setImages(files => [
                ...files,
                URL.createObjectURL(event.target.files[i])
            ]);
            console.log(images);
        }
    }

    const removeFile = (event) => {
        let removeId = event.target.getAttribute("data-index");
        images.splice(removeId, 1);
        setImages([
            ...images
        ]);
    }

    return (
        <div className={`${styles["image-container"]} ${(images.length >= 1 ? styles["has-picture"] : styles["no-picture"])}`}>
            <div className={styles["preview-image-container"]}>
                <div className={styles["first-preview-image"]}>
                    {images.filter((file, index) => index === 0).map((file, index) =>
                        <img data-index={index} className={styles["preview-image"]} src={file} onClick={removeFile} alt=""/>
                    )}
                </div>
                <div className={styles["preview-images-right"]}>
                    {images.filter((file, index) => index >= 1).map((file, index) =>
                        <img data-index={index} className={styles["preview-image"]} src={file} onClick={removeFile} alt=""/>
                    )}
                </div>
            </div>
            <div className={styles["add-new-image"]}>
                <label htmlFor={"uploadImage"} className={"btn btn-icon"}>+</label>
                <input id={"uploadImage"} multiple={true} type='file' accept="image/*" onChange={handleChange}/>
            </div>
        </div>
    )
}