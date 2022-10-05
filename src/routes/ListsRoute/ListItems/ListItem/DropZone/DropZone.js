import { useDroppable } from "@dnd-kit/core";
import style from "./DropZone.module.scss";

export const DropZone = ({listId}) => {

    const {setNodeRef, isOver} = useDroppable({id: `${listId}`});

    const dropStyle = {
        height: isOver ? "2px" : "0px",
    }

    return(
        <div ref={setNodeRef} className={style.DropZone} style={dropStyle}>
        </div>
    )
}