import { connect } from "react-redux";
import { NbLists } from './NbLists';

const UnconnectedNbListsControl = (props) => {

    return (
        <>
            <NbLists count={props.count}/>
            <button onClick={props.handleDecrementClick}>-</button>
            <button onClick={props.handleIncrementClick}>+</button>
        </>
    )
}

const mapStateToProps = state => {
    return {
        count: state
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleIncrementClick: () => dispatch({ type: 'INCREMENT' }),
        handleDecrementClick: () => dispatch({type: 'DECREMENT'})
    }
}


export const NbListsControls = connect(mapStateToProps, mapDispatchToProps)(UnconnectedNbListsControl);
