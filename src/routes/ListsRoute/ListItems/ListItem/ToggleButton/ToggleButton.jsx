import styles from "./ToggleButton.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";

export const ToggleButton = ({extended, listId}) => {
    const dispatch = useDispatch();

    function toggleExtended() {
        const action = {
            type: 'lists/toggleOpen',
            payload : {
                listId: listId,
            },
        };
        dispatch(action);
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