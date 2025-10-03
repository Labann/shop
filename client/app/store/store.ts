import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import shopReducer from "./shopSlice"
const store = configureStore({
    reducer: {
        auth: authReducer,
        shop: shopReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;