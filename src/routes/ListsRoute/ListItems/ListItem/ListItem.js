import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { NewListForm } from "./NewListForm/NewListForm";
import { ListItems } from "../ListItems";
import { ListCheckBox } from "./ListCheckBox/ListCheckBox";
import { DragHandle } from "./DragHandle/DragHandle";
import { DeleteButton } from "./DeleteButton/DeleteButton";
import { ToggleButton } from "./ToggleButton/ToggleButton"

import styles from "./ListItem.module.scss";

export const ListItem = (props) => {

    const [itemHover, setItemHover] = useState(false);

    const [extended, setExtended] = useState(false);


    const listsById = useSelector(state => state.listsById);
    const isChecked = useSelector(state => state.listsById[props.listId].isChecked);

    const currentList = listsById[props.listId];

    if(props.nesting != currentList.nesting) {
        return;
    }

   

    const listItemStyle = {
        marginRight: `${props.nesting * 32 + 8}px`,
    }

    const listItemContent = (
                    
        <>
            <ListItems
                parentListId={props.listId}
                listIds={currentList.children}
                nesting={props.nesting + 1}
            />
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
                onMouseEnter={() => {setItemHover(true)}}
                onMouseLeave={() => {setItemHover(false)}}
            >
                <DragHandle
                    style={listItemStyle}
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
            {extended ? listItemContent : ""}
        </>
    )
}
