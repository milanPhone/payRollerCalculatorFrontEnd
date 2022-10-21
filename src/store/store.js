import { configureStore } from "@reduxjs/toolkit";
import currentUserSlice from "./slices/currentUserSlice";

const store = configureStore({
    reducer: {
        currentUserReducer: currentUserSlice.reducer
    }
})

export default store;