import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export const ListsView = (props) => {

    const dispatch = useDispatch();

    const [deletedIndex, setDeletedIndex] = useState('');

    const handleDeleteInputChange = (event) => {
        setDeletedIndex(event.target.value);
    }

    const removeList = () => {
        const action = {
            type: 'lists/removeList',
            payload: {
                listId: deletedIndex,
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


    

    return (
        <>
            <pre>{useSelector(state => JSON.stringify(state, null, 4))}</pre>
            <input value={deletedIndex} onChange={handleDeleteInputChange} />
            <button onClick={removeList}>-</button>
            <button onClick={addTestList}>+</button>
        </>
    )
}
