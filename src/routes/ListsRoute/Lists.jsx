import { closestCenter, DndContext } from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";
import { ListItem } from "./ListItems/ListItem/ListItem";
import styles from "./Lists.module.scss";

export function Lists(props) {

  const listIds = useSelector(state => state.listIds);

  const dispatch = useDispatch()

  function handleDragEnd(event) {
    const action = {
      type: 'lists/moveList',
      payload: {
        from: event.active.id,
        to: event.over.id,
      },
    };

    dispatch(action);
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

