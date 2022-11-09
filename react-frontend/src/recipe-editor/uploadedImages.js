import styles from './RecipeEditor.module.css';
import {useState} from "react";

export default function UploadedImages({images}) {

    const [files, setFiles] = useState([]);
    const [firstPreview, setFirstPreview] = useState();

    function handleChange(e) {
        setFiles(files => []);
        if (e.target.files.length === 0) {
            return;
        }
        setFirstPreview(firstPreview => [
                firstPreview = URL.createObjectURL(e.target.files[0])
            ]
        )
        for (let i = 1; i < e.target.files.length; i++) {
            setFiles(files => [
                ...files,
                URL.createObjectURL(e.target.files[i])
            ]);
        }
    }

    return (
        <div className={styles.imageContainer}>
            <div className={styles.previewImageContainer}>
                <div className={styles.firstPreviewImage}>
                    <img src={firstPreview}/>
                </div>
                <div className={styles.previewImagesRight}>
                    {files.map((file) =>
                        <img className={styles.previewImage} src={file}/>
                    )}
                </div>
            </div>
            <div>
                <label htmlFor={styles.uploadImage} className={styles.uploadImageLabel}>+</label>
                <input id={styles.uploadImage} multiple={true} type='file' onChange={handleChange}/>
            </div>
        </div>
    )
}