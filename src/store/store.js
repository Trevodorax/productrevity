import { createStore } from "redux";
import { ListsReducer } from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(ListsReducer, composeWithDevTools());

