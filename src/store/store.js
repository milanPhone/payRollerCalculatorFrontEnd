import { configureStore } from "@reduxjs/toolkit";
import currentUserSlice from "./slices/currentUserSlice";
import alertHandlerSlice from "./slices/alert-handler-slice";
const store = configureStore({
    reducer: {
        currentUserReducer: currentUserSlice.reducer,
        alertHandlerSlice: alertHandlerSlice.reducer
    }
})

export default store;