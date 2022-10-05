import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { NewListForm } from "./NewListForm/NewListForm";
import { ListCheckBox } from "./ListCheckBox/ListCheckBox";
import { DragHandle } from "./DragHandle/DragHandle";
import { DeleteButton } from "./DeleteButton/DeleteButton";
import { ToggleButton } from "./ToggleButton/ToggleButton"

import styles from "./ListItem.module.scss";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { DropZone } from "./DropZone/DropZone";

export const ListItem = (props) => {

    const [itemHover, setItemHover] = useState(false);

    const [extended, setExtended] = useState(false);


    const listsById = useSelector(state => state.listsById);
    const isChecked = useSelector(state => state.listsById[props.listId].isChecked);

    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: `drag${props.listId}`,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    const currentList = listsById[props.listId];

    if(props.nesting != currentList.nesting) {
        return;
    }

    const listItemStyle = {
        marginRight: `${props.nesting * 32 + 8}px`,
    }

    const listItemContent = (
                    
        <>
            {currentList.children.map(listId => {
            return (
                <ListItem 
                    key={listId}
                    listId={listId}
                    nesting={props.nesting + 1}
                    parentListId={props.listId}
                />
            )
            })}
            <NewListForm
                parentListId={props.listId}
                nesting={props.nesting}
            />
        </>
    );


    return (
        <>
            <div 
                className={styles.listItem} 
                nesting={props.nesting} 
                key={props.listId}
                ref={setNodeRef}
                style={style}

                onMouseEnter={() => {setItemHover(true)}}
                onMouseLeave={() => {setItemHover(false)}}
            >
                <DragHandle
                    style={listItemStyle}
                    dragAttributes={attributes}
                    dragListeners={listeners}
                />
                <ListCheckBox
                    isChecked={isChecked}
                    listId={props.listId}
                />
                <h3>{currentList.title}</h3>
                <DeleteButton
                    listId={props.listId}
                    parentListId={props.parentListId}
                    itemHover={itemHover}
                />
                <ToggleButton 
                    extended={extended}
                    setExtended={setExtended}
                    itemHover={itemHover}
                />
                
            </div>
            <DropZone
                listId={props.listId}
            />
            {extended ? listItemContent : ""}
        </>
    )
}
