import { useSelector } from "react-redux";
import { ListItems } from "./ListItems/ListItems";
import styles from "./Lists.module.scss";

export function Lists(props) {

  const listIds = useSelector(state => state.listIds);

  return (
    <main>
      <ListItems 
        className={styles.ListItems}
          listIds={listIds}
          nesting={0}
      />
    </main>
  );
}