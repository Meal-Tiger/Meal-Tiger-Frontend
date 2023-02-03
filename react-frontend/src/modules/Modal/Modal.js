import styles from'./Modal.module.css'

export default function Modal(props){

    function closeModal(e){
        e.stopPropagation();
        props.setShow(false);
    }

    if(!props.show){
        return null;
    }

    return (
        <div className={styles.background} onClick={closeModal}>
            <div className={`${styles.modal} ${props.className}`} onClick={e => e.stopPropagation()}>
                {props.closeButton ? <span onClick={closeModal} className={`material-symbols-outlined ${styles["close-button"]}`}>cancel</span> : ''}
                {props.children}
            </div>
        </div>
    );
}