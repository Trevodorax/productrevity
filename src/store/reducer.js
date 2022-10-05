import { createAction, createReducer } from "@reduxjs/toolkit";

const addList = createAction('lists/addList');
const removeList = createAction('lists/removeList');
const toggleCheck = createAction('lists/toggleCheck');
const toggleOpen = createAction('lists/toggleOpen');
const moveList = createAction('lists/moveList');


const initialListsState = {
    listIds: ['0'],
    listsById: {
        '0': {
            id: '0',
            status: 'todo',
            title: 'Mes todo lists',
            parent: null,
            children: [],
            isChecked: false,
            isOpen: false,
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
        .addCase(toggleOpen, (state, action) => {
            // payload: listId

            state.listsById[action.payload.listId].isOpen = (!state.listsById[action.payload.listId].isOpen);
        })
        .addCase(moveList, (state, action) => {
            // payload : from, to

            const from = action.payload.from;
            const to = action.payload.to;

            // get all lists where the "from" list can't be moved (itself and its children)
            const recursiveIds = getRecursiveIds(state, [from]);

            // stop if "to" id is part of the impossible list
            if(recursiveIds.includes(to)) {
                return;
            }

            // if "from" and "to" are brothers and "to" is closed, just put "from" after "to" in their parent's children list
            if(state.listsById[from].parent === state.listsById[to].parent && !state.listsById[to].isOpen) {
                const parentListId = state.listsById[from].parent;

                // removing the old index in this children list
                const deletedChildIndex = state.listsById[parentListId].children.indexOf(from);
                if(deletedChildIndex !== -1) {
                    state.listsById[parentListId].children.splice(deletedChildIndex, 1);
                }

                // get the new index to move "from" to
                const newIndex = state.listsById[parentListId].children.indexOf(to);

                // adding it after this index
                state.listsById[parentListId].children.splice(newIndex + 1, 0, from);
                return;
            }

            // if "to" is "from"'s parent, just put "from" to the first index of the parent's children list
            if(state.listsById[from].parent === to) {
                const parentListId = state.listsById[from].parent;

                // removing the old index in this children list
                const deletedChildIndex = state.listsById[parentListId].children.indexOf(from);
                if(deletedChildIndex !== -1) {
                    state.listsById[parentListId].children.splice(deletedChildIndex, 1);
                }

                // adding this id to the beginning of parent's children array
                state.listsById[parentListId].children.unshift(from);
                
                return;
            }

            // removing element from the previous parent's children list
            const prevParent = state.listsById[from].parent;
            const deletedChildIndex = state.listsById[prevParent].children.indexOf(from);
            if(deletedChildIndex !== -1) {
                state.listsById[prevParent].children.splice(deletedChildIndex, 1);
            }

            // adding element to the new parent's children list
            state.listsById[to].children.push(from);

            // change the moved list's parent to the new list id
            state.listsById[from].parent = to;

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