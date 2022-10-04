import { createAction, createReducer } from "@reduxjs/toolkit";



const addList = createAction('lists/addList');
const removeList = createAction('lists/removeList');
const toggleCheck = createAction('lists/toggleCheck');

const initialListsState = {
    listIds: ['0'],
    listsById: {
        '0': {
            id: '0',
            nesting: 0,
            status: 'todo',
            title: 'Mes todo lists',
            parent: null,
            children: [],
            isChecked: false
        },
    },
};

export const ListsReducer = createReducer(initialListsState, (builder) => {
    builder
        .addCase(addList, (state, action) => {
            // payload : listTitle, parentListId

            // adding the new list to the ids list
            const newListId = calculateNewId(state.listIds);
            state.listIds.push(newListId);

            // adding the new list to the lists
            const newList = {
                id: newListId,
                nesting: getNesting(state.listsById, action.payload.parentListId),
                isChecked: false,
                parent: action.payload.parentListId,
                title: action.payload.listTitle,
                children: [],
            }
            state.listsById[newListId] = newList;

            // updating parent children array
            state.listsById[action.payload.parentListId].children.push(newListId);
        })
        .addCase(removeList, (state, action) => {
            // payload : listId

            const idsToDelete = getRecursiveIds(state, [action.payload.listId]);

            // removing the id from parent's children list
            const parentId = state.listsById[action.payload.listId].parent;
            const deletedChildIndex = state.listsById[parentId].children.indexOf(action.payload.listId);
            if(deletedChildIndex !== -1) {
                state.listsById[parentId].children.splice(deletedChildIndex, 1);
            }

            idsToDelete.forEach(idToDelete => {
                // deleting list from the lists object (key and value)
                delete state.listsById[idToDelete];
                // deleting it from the array of ids
                const deletedListIndex = state.listIds.indexOf(idToDelete);
                if(deletedListIndex !== -1) {
                    state.listIds.splice(deletedListIndex, 1);
                }
                
            });
        })
        .addCase(toggleCheck, (state, action) => {
            // payload : listId

            const listsToCheck = getRecursiveIds(state, [action.payload.listId]);
            const previousCheckStatus = state.listsById[action.payload.listId].isChecked;

            listsToCheck.forEach(idToCheck => {
                state.listsById[idToCheck].isChecked = !previousCheckStatus;
            });
        })
})


function getRecursiveIds (state, ids = []) {

    const recursiveIds = ids.reduce((acc, id) => {
  
      if (state.listsById[id]?.children?.length) {
        return [...acc, id, ...getRecursiveIds(state, state.listsById[id]?.children)]
      }
  
      return [...acc, id]
  
    }, [])
  
    return recursiveIds; 
  
  }

function calculateNewId(existingIds) {
    let newId = null;

    // sort array for comparison
    existingIds.sort();

    for(let i = 0; i < existingIds.length - 1; i++) {
        if(parseInt(existingIds[i + 1]) != parseInt(existingIds[i]) + 1) {
            return (existingIds[i] + 1).toString();
        }
    }

    return (existingIds.length).toString();;
}

function getNesting(listsById, parentListId) {
    return listsById[parentListId].nesting + 1;
}
