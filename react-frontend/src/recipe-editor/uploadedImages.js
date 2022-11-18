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
        <div className={`${styles.imageContainer} ${(files.length >= 1 ? styles.hasPicture : styles.noPicture)}`}>
            <div className={styles.previewImageContainer}>
                <div className={styles.firstPreviewImage}>
                    {files.filter((file, index) => index === 0).map((file, index) =>
                        <img data-index={index} className={styles.previewImage} src={file} onClick={removeFile}/>
                    )}
                </div>
                <div className={styles.previewImagesRight}>
                    {files.filter((file, index) => index >= 1).map((file, index) =>
                        <img data-index={index} className={styles.previewImage} src={file} onClick={removeFile}/>
                    )}
                </div>
            </div>
            <div className={styles.addNewImage}>
                <label htmlFor={styles.uploadImage} className={styles.uploadImageLabel}>+</label>
                <input id={styles.uploadImage} multiple={true} type='file' accept="image/*" onChange={handleChange}/>
            </div>
        </div>
    )
}