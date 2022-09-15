import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./NewListForm.module.scss";

export const NewListForm = (props) => {

    const dispatch = useDispatch();

    const [newListTitle, setNewListTitle] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        
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


    return (
        <form className={styles.NewListForm} onSubmit={handleSubmit}>
            <input value={newListTitle} onChange={(event) => setNewListTitle(event.target.value)} />
        </form>
    )
}
