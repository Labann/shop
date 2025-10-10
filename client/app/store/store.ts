import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import shopReducer from "./shopSlice"
import productReducer from "./productSlice"
import cartReducer from "./cartSlice"
import orderReducer from "./orderSlice"
const store = configureStore({
    reducer: {
        auth: authReducer,
        shop: shopReducer,
        product: productReducer,
        cart: cartReducer,
        order: orderReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;