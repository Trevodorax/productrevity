import "./ListItem.css"

export const ListItem = (props) => {

    const recursiveGetLists = props.recursiveGetLists;

    const style = {
        marginLeft: 32 * props.nesting + "px",
    }

    console.log(props.nesting)

    return (
        <div className="listItem" nesting={props.nesting} style={style}>
            <h1>{props.title}</h1>
            <button onClick={props.removeList}>DELETE</button>
            {(props.children.length > 0) ? recursiveGetLists(props.children) : ''}
        </div>
    )
}