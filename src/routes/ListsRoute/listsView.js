import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ListItem } from "./ListItem";

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

    function addTestList() {
        const action = {
            type: 'lists/addList',
            payload: {
                listTitle: 'Example new list',
                parentListId: 0,
            },
        };

        dispatch(action)
    }


    
    const listIds = useSelector(state => state.listIds);
    let listIdsLeft = listIds.slice();
    const listsById = useSelector(state => state.listsById);

    function recursiveGetLists(listIds) {
        listIds.filter(listId => listIdsLeft.includes(listId));
        return listIds.map((listId) => {
            if(!listIdsLeft.includes(listId)) {
                return;
            }
            const currentList = listsById[listId];
            listIdsLeft = listIdsLeft.filter(id => id != listId);

            return (
                <ListItem 
                    key={listId}
                    nesting={currentList.nesting}
                    title={currentList.title}
                    removeList={() => removeList(listId)}
                    recursiveGetLists={recursiveGetLists}
                    children={currentList.children}
                />
            );
        })
    }

    return (
        <>
            {recursiveGetLists(listIds)}
        </>
    )
}
