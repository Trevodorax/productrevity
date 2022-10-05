import { closestCenter, DndContext } from "@dnd-kit/core";
import { useSelector } from "react-redux";
import { ListItems } from "./ListItems/ListItems";
import { ListItem } from "./ListItems/ListItem/ListItem";
import styles from "./Lists.module.scss";

export function Lists(props) {

  const listIds = useSelector(state => state.listIds);

  function handleDragOver(event) {
    console.log(event)
  }

  return (
    <main>
      <DndContext onDragOver={handleDragOver} collisionDetection={closestCenter}>
        <ListItem 
            listId={listIds[0]}
            nesting={0}
            parentListId={null}
        />
      </DndContext>
    </main>
  );
}

