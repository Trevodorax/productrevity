const initialState = {
    count: 0,
}

export const countReducer = (state = initialState, action) => {
    switch(action.type) {
        case "INCREMENT" :
            return {...initialState, count: state.count + 1};
        case "DECREMENT" :
            return {...initialState, count: state.count - 1};
        default :
            return state;
    };
};
