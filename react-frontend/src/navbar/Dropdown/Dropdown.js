import { closeDropdown_event } from 'modules/events';
import styles from './Dropdown.module.css'

export default function Dropdown(props){

    function closeDropdown(e){
        e.stopPropagation();
        props.setShow(false);
    }

    if(!props.show){
        return null;
    }

    return (
        <div className={styles.dropdown} onClick={closeDropdown}>
            {props.children}
        </div>
    );
}