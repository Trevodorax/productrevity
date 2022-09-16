import styles from "./DeleteButton.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";

export const DeleteButton = ({listId, parentListId, itemHover}) => {

    const dispatch = useDispatch();

    function removeList(listId, parentListId) {
        const action = {
            type: 'lists/removeList',
            payload: {
                listId: listId,
                parentListId: parentListId,
            },
        };

        dispatch(action);
    }

    const appearOnHover = {
        opacity: itemHover ? 1 : 0,
    }

    return (
        <FontAwesomeIcon 
            onClick={() => removeList(listId, parentListId)} 
            className={styles.DeleteButton} 
            icon={faTrash} 
            size="lg"
            style={appearOnHover}
        />
    )
}