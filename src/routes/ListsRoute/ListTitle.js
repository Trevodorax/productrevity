import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

export const ListTitle = ({isChecked, toggleCheck, title, removeList, toggleExtended, listId, parentListId, extended}) => {
    return (
        <h1>
            <input className="checkbox" type="checkbox" checked={isChecked} onChange={() => toggleCheck(listId)}/>
            {title}
            <button onClick={() => removeList(listId, parentListId)}>
                X
            </button>
            <FontAwesomeIcon onClick={toggleExtended} icon={faAngleRight} rotation={extended ? 90 : 0}/>
        </h1>
    )
}