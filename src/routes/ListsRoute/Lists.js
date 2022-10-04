import { closestCenter, DndContext } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { ListItems } from "./ListItems/ListItems";
import styles from "./Lists.module.scss";

export function Lists(props) {

  const listIds = useSelector(state => state.listIds);

  function handleDragOver(event) {
    console.log(event)
  }

  return (
    <main>
      <DndContext onDragOver={handleDragOver} collisionDetection={closestCenter}>
        <ListItems 
          className={styles.ListItems}
            listIds={listIds}
            nesting={0}
        />
      </DndContext>
    </main>
  );
}

