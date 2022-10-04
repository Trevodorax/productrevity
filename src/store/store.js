import { createStore } from "redux";
import { ListsReducer } from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";

const storeConfiguration = {
    reducer: ListsReducer,
    devTools: true,
};

export const store = configureStore(storeConfiguration);

