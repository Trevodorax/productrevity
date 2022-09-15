const initialListsState = {
    listIds: [0],
    listsById: {
        0: {
            id: 0,
            nesting: 0,
            status: 'todo',
            title: 'Mes todo lists',
            parent: null,
            children: [],
            isChecked: false
        },
    },
};

//  actions :
//    lists/addList
//    lists/removeList
//    lists/changeListStatus
//    lists/modifyListTitle

export const ListsReducer = (state = initialListsState, action) => {
    switch(action.type) {
        case 'lists/addList' :
            // payload : listTitle, parentListId

            const newListId = calculateNewId(state.listIds);
            const parentListId = action.payload.parentListId;

            return {
                ...state,
                listIds: state.listIds.concat(newListId),
                listsById: {
                    ...state.listsById,
                    [newListId]: {
                        id: newListId,
                        nesting: getNesting(state.listsById, parentListId),
                        isChecked: false,
                        parent: parentListId,
                        title: action.payload.listTitle,
                        children: [],
                    },
                    [parentListId]: {
                        ...state.listsById[parentListId],
                        children: state.listsById[parentListId].children.concat(newListId),
                    },
                },
            };

        case 'lists/removeList' :
            // payload: listId, parentListId

            if(action.payload.listId == 0) {
                return state;
            }

            const idsToDelete = getRecursiveIds(state, [action.payload.listId]);

            // creating a copy of the original listsById without the attribute "action.payload.listId"
            const newListsById = Object.values(state.listsById).reduce((acc, list) => {
                if (idsToDelete.includes(list.id)) {
                    return acc;
                }

                return {...acc, [list.id]: list}
            }, {})

            return {
                ...state,
                listIds: state.listIds.filter(listId => !idsToDelete.includes(listId)),
                listsById: {
                    ...newListsById,
                    [action.payload.parentListId]: {
                        ...state.listsById[action.payload.parentListId],
                        children: state.listsById[action.payload.parentListId].children.filter(id => id != action.payload.listId),
                    },
                },
            };

        case 'lists/toggleCheck' :
            //payload: listId

            const listId = action.payload.listId;
            const currentCheckStatus = state.listsById[listId].isChecked;

            const idsToCheck = getRecursiveIds(state, [listId])
            idsToCheck.unshift(0);

            const modifiedLists = idsToCheck.reduce((acc, idToCheck) => {
                
                return {
                    ...acc,
                    [idToCheck]: {
                        ...state.listsById[idToCheck],
                        isChecked: !currentCheckStatus,
                    },
                };
            });

            return {
                ...state,
                listsById: {
                    ...state.listsById,
                    ...modifiedLists,
                },
            };

        default :
            return state;
    };
};

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
        if(existingIds[i + 1] != existingIds[i] + 1) {
            return existingIds[i] + 1
        }
    }

    return existingIds.length;
}

function getNesting(listsById, parentListId) {
    return listsById[parentListId].nesting + 1;
}
