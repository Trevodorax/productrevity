import { createStore } from "redux";
import { ListsReducer } from "./reducer";

export const store = createStore(ListsReducer);

