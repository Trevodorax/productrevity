import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NewListForm } from "./NewListForm";
import "./ListItems.css";



export const ListItems = (props) => {

    const [extended, setExtended] = useState(true);

    function toggleExtended() {
        setExtended(!extended);
    }
    
    const dispatch = useDispatch();

    const listsById = useSelector(state => state.listsById);

    const listItemStyle = {
        marginLeft: `${props.nesting * 32}px`,
    }

    const listContentStyle = {
        height: extended ? "fit-content" : 0,
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

    return (
        props.listIds.map(listId => {

            const currentList = listsById[listId];

            if(props.nesting != currentList.nesting) {
                return;
            }

            return (
                <div className="listItem" nesting={props.nesting} style={listItemStyle} key={listId}>
                    <h1><input type="checkbox" />{currentList.title}<button onClick={toggleExtended}>{extended ? 'fermer' : 'ouvrir'}</button></h1>
                    <div className="listContent" style={listContentStyle}>
                        <button onClick={() => removeList(listId, props.parentListId)}>X</button>
                        <NewListForm 
                            parentListId={listId}
                        />
                        <ListItems
                            parentListId={listId}
                            listIds={currentList.children}
                            nesting={props.nesting + 1}
                        />
                    </div>
                    
                </div>
            )
        })
    )
}
