import { ListItem } from "./ListItem";

export const ListItems = (props) => {

    return (
        props.listIds.map(listId => {
            return (
                <ListItem 
                    key={listId}
                    listId={listId}
                    nesting={props.nesting}
                    parentListId={props.parentListId}
                />
            )
        })
    )
}
