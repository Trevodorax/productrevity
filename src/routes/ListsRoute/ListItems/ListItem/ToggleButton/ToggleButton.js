import styles from "./ToggleButton.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

export const ToggleButton = ({extended, setExtended}) => {
    function toggleExtended() {
        setExtended(!extended);
    };

    return (
        <FontAwesomeIcon 
            onClick={toggleExtended} 
            icon={faAngleRight} 
            rotation={extended ? 270 : 90} 
            className={styles.ToggleButton} 
            size="lg"
        />
    );
};