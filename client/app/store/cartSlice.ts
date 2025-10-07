import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ICart } from "../types";
import { apiUrl } from "../config/apiUrl";


interface IInitialState{
    cart: ICart | null,
    isLoading: boolean
    isSuccess: boolean
    isError : boolean
    message: string
}

const initialState: IInitialState = {
    cart: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}

export const getCartItems = createAsyncThunk<
    ICart,
    void,
    {rejectValue:  string}
>("/cart", async (_, thunkApi) => {
    try {
        const res = await fetch(`${apiUrl}/api/cart/me`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        
        if(data.error){
            return thunkApi.rejectWithValue(data.error);
        }

        localStorage.setItem("cart", JSON.stringify(data));
        return data;
    } catch (error) {
        console.error(error);
        return thunkApi.rejectWithValue((error as Error).message)
    }
})

export const addToCart = createAsyncThunk<
    ICart,
    {cartId: string, productId: string, quantity: number}
>("/cart/add", async ({cartId, productId, quantity}, thunkApi) => {
    try {
        const res = await fetch(`${apiUrl}/api/cart/add`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({cartId, productId, quantity})
        });

        const data = await res.json();

        if(data.error){
            return thunkApi.rejectWithValue(data.error);
        }

        localStorage.setItem("cart", JSON.stringify(data));
        return data;
    } catch (error) {
        console.error(error);
        return thunkApi.rejectWithValue((error as Error).message);
    }
})


export const createCart = createAsyncThunk<
    ICart,
    void,
    {rejectValue: string}
>("/cart/create", async (_, thunkApi) => {
    try {
        const res = await fetch(`${apiUrl}/api/cart/create`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        if(data.error){
            return thunkApi.rejectWithValue(data.error);
        }

        localStorage.setItem("cart", JSON.stringify(data));
        return data;
    } catch (error) {
        console.error(error);
        return thunkApi.rejectWithValue((error as Error).message)
    }
})
const cartSlice = createSlice({
    name: "cart", 
    initialState: initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.message = ""
            state.isError = false
        }
    },
    extraReducers: (builder => {
        builder
            .addCase(getCartItems.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                
                state.cart = action.payload
            })
            .addCase(getCartItems.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.cart= action.payload
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })
            .addCase(createCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createCart.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.cart = action.payload
            })
            .addCase(createCart.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })
            
    })
})



export const {reset} = cartSlice.actions;

export default cartSlice.reducer;