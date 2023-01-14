import styles from './throbber.module.css';

export default function Throbber() {

    return (
        <div className={styles['lds-ring']}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}