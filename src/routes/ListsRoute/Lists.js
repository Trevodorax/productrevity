import { closestCenter, DndContext } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { ListItem } from "./ListItems/ListItem/ListItem";
import styles from "./Lists.module.scss";

export function Lists(props) {

  const listIds = useSelector(state => state.listIds);

  function handleDragEnd(event) {
    console.log(event)
  }

  return (
    <main>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <ListItem 
            listId={listIds[0]}
            nesting={0}
            parentListId={null}
        />
      </DndContext>
    </main>
  );
}

