import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./NewListForm.module.scss";

export const NewListForm = (props) => {

    const dispatch = useDispatch();

    const [newListTitle, setNewListTitle] = useState('');

    function createNewList () {
        const action = {
            type: 'lists/addList',
            payload: {
                listTitle: newListTitle,
                parentListId: props.parentListId,
            },
        };

        dispatch(action);

        setNewListTitle('');
    }

    const nestedPadding = {
        paddingLeft: `${props.nesting * 32 + 32}px`,
    }

    function handleKeyDown(event) {
        if(event.code == "Enter") {
            createNewList();
        }
    }


    return (
        <input 
            onKeyDown={handleKeyDown} 
            className={styles.NewListForm} 
            style={nestedPadding} 
            value={newListTitle} 
            onChange={(event) => setNewListTitle(event.target.value)} 
            placeholder="Add new item"
        />
    )
}