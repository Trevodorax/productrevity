import { useDraggable, useDroppable} from "@dnd-kit/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

export const ListTitle = ({isChecked, toggleCheck, title, removeList, toggleExtended, listId, parentListId, extended}) => {

    const {
        attributes,
        listeners,
        setNodeRef: draggableRef,
        transform
      } = useDraggable({
        id: listId
      });
    
    const { isOver, setNodeRef: droppableRef } = useDroppable({
        id: listId
    });
    
    const transformStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        position: "absolute",
        color: isOver ? "blue" : "inherit",
        }
    : undefined;
        
    
    const dragNDropAttributes = {
        ref:(el) => {
            draggableRef(el);
            droppableRef(el);
        },
        id:listId,
        style:transformStyle,
        ...listeners,
        ...attributes,
    }

    return (
        <h1>
            <input 
                className="checkbox" 
                type="checkbox" 
                checked={isChecked} 
                onChange={() => toggleCheck(listId)}
            />
            <span  {...dragNDropAttributes}>
                {title}
            </span>
            <button onClick={() => removeList(listId, parentListId)}>
                X
            </button>
            <FontAwesomeIcon onClick={toggleExtended} icon={faAngleRight} rotation={extended ? 90 : 0}/>
        </h1>
    );
};
