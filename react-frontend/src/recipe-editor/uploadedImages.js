import styles from './RecipeEditor.module.css';

export default function UploadedImages ({images}){

    const getSmallImage = (images) => {
            images.map( (image) => {
                return <div style={{backgroundImage:`url(${image.url})`}}></div>
            })
    }

    return(
        <div className={styles.rightImages}>
            {getSmallImage(images)}
        </div>
    )
}