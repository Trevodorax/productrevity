import { connect } from "react-redux";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";

export const NbLists = (props) => {
    return(
        <div>{props.count}</div>
    )
}