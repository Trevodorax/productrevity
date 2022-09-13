const initialListsState = {
    listIds: [0, 1, 2],
    listsById: {
        0: {
            id: 0,
            nesting: 0,
            status: 'todo',
            title: 'List 1',
            parent: null,
            children: [1, 2],
        },
        1: {
            id: 1,
            nesting: 1,
            status: 'doing',
            title: 'List 2',
            parent: 0,
            children: [],
        },
        2: {
            id: 2,
            nesting: 1,
            status: 'done',
            title: 'List 3',
            parent: 0,
            children: [],
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
                        status: 'todo',
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

            // creating a copy of the original listsById without the attribute "action.payload.listId"
            const {[action.payload.listId]: removedList, ...newListsById} = state.listsById

            return {
                ...state,
                listIds: state.listIds.filter(listId => listId != action.payload.listId),
                listsById: {
                    ...newListsById,
                    [action.payload.parentListId]: {
                        ...state.listsById[action.payload.parentListId],
                        children: state.listsById[action.payload.parentListId].children.filter(id => id != action.payload.listId),
                    },
                },
            };

        default :
            return state;
    };
};


function calculateNewId(existingIds) {
    let newId = null;

    // sort array for comparison
    existingIds.sort();

    if(existingIds[0] != 0) {
        return 0;
    }

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
