import styles from "./DragHandle.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';

export const DragHandle = ({style, dragAttributes, dragListeners}) => {
    return (
        <FontAwesomeIcon {...dragAttributes} {...dragListeners} className={styles.DragHandle} icon={faGripVertical} size="lg" style={style}/>
    )
}
