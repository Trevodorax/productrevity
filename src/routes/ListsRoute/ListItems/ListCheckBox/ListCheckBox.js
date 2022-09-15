import styles from "./ListCheckBox.module.scss";
import { useDispatch } from "react-redux";

export const ListCheckBox = ({listId, isChecked}) => {

    const dispatch = useDispatch();

    function toggleCheck(listId) {
        console.log(listId)
        const action = {
            type: 'lists/toggleCheck',
            payload: {
                listId: listId,
            },
        };
        dispatch(action);
    }

    return (
        <input 
            className={styles.ListCheckBox}
            type="checkbox" 
            checked={isChecked}
            onChange={() => toggleCheck(listId)}
        />
    )
}