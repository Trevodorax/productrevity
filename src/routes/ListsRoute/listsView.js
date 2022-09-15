import { DndContext, useDndMonitor } from "@dnd-kit/core";
import { useSelector, useDispatch } from "react-redux";
import { ListItems } from "./ListItems";

export const ListsView = (props) => {

    const dispatch = useDispatch();

    function handleDragEnd(event) {
        console.log(event);
    }
    
    const listIds = useSelector(state => state.listIds);

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <ListItems 
                listIds={listIds}
                nesting={0}
            />
        </DndContext>
    );
};
