import { configureStore } from "@reduxjs/toolkit";
import periodicTableReducer from "./periodicTableSlice";

export const store = configureStore({
    reducer: {
        periodicTable: periodicTableReducer
    }
})

export default store;