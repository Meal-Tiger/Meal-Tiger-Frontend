import styles from './RecipeEditor.module.css';
import {useState} from "react";

export default function UploadedImages({images}) {

    const [files, setFiles] = useState([]);

    const handleChange = (event) => {
        if (event.target.files.length === 0) {
            return;
        }
        for (let i = 0; i < event.target.files.length; i++) {
            setFiles(files => [
                ...files,
                URL.createObjectURL(event.target.files[i])
            ]);
        }
    }

    const removeFile = (event) => {
        let removeId = event.target.getAttribute("data-index");
        files.splice(removeId, 1);
        setFiles([
            ...files
        ]);
    }

    return (
        <div className={`${styles["image-container"]} ${(files.length >= 1 ? styles["has-picture"] : styles["no-picture"])}`}>
            <div className={styles["preview-image-container"]}>
                <div className={styles["first-preview-image"]}>
                    {files.filter((file, index) => index === 0).map((file, index) =>
                        <img data-index={index} className={styles["preview-image"]} src={file} onClick={removeFile} alt=""/>
                    )}
                </div>
                <div className={styles.previewImagesRight}>
                    {files.filter((file, index) => index >= 1).map((file, index) =>
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