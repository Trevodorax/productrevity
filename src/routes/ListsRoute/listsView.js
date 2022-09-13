import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ListItems } from "./ListItems";

export const ListsView = (props) => {

    const dispatch = useDispatch();

    const removeList = (listId) => {
        const action = {
            type: 'lists/removeList',
            payload: {
                listId: listId,
                parentListId: 0,
            }
        }

        dispatch(action);
    }
    
    const listIds = useSelector(state => state.listIds);

    return (
        <ListItems 
            listIds={listIds}
            nesting={0}
        />
    )
}
