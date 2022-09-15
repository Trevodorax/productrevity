import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import styles from "./ListTitle.module.scss";

export const ListTitle = ({title, removeList, toggleExtended, listId, parentListId, extended}) => {

    return (
        <div className={styles.ListTitle}>
            <span>
                {title}
            </span>
            <button onClick={() => removeList(listId, parentListId)}>
                X
            </button>
            <FontAwesomeIcon onClick={toggleExtended} icon={faAngleRight} rotation={extended ? 90 : 0}/>
        </div>
    );
};
