import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { NewListForm } from "./NewListForm";
import { ListItems } from "./ListItems";
import { ListTitle } from "./ListTitle";

import "./ListItem.scss";

export const ListItem = (props) => {
    const dispatch = useDispatch();

    const [extended, setExtended] = useState(false);

    function toggleExtended() {
        setExtended(!extended);
    }

    const listsById = useSelector(state => state.listsById);
    const isChecked = useSelector(state => state.listsById[props.listId].isChecked);

    const listItemStyle = {
        marginLeft: `${props.nesting * 32}px`,
    }

    const listContentStyle = {
        display: extended ? "block" : "none",
    }

    const currentList = listsById[props.listId];

    if(props.nesting != currentList.nesting) {
        return;
    }

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

    function toggleCheck(listId) {

        const action = {
            type: 'lists/toggleCheck',
            payload: {
                listId: listId,
            },
        };

        dispatch(action);
    }

    const listItemContent = (
        <div className="listContent" style={listContentStyle}>
                    
            <NewListForm 
                parentListId={props.listId}
            />
            <ListItems
                parentListId={props.listId}
                listIds={currentList.children}
                nesting={props.nesting + 1}
            />
        </div>
    )

    const conditionalListItemContent = extended ? listItemContent : "";

    

    return (
        <div className="listItem" nesting={props.nesting} style={listItemStyle} key={props.listId}>
            <ListTitle 
                isChecked={isChecked}
                toggleCheck={toggleCheck}
                title={currentList.title}
                removeList={removeList}
                toggleExtended={toggleExtended}
                listId={props.listId}
                parentListId={props.parentListId}
                extended={extended}
            />
            {conditionalListItemContent}
            
        </div>
    )
}
