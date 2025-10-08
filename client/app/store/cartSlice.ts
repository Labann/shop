import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ICart, ICartItem } from "../types";
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
    ICartItem,
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

export const updateItemQuantity = createAsyncThunk<
    ICartItem,
    {cartId: string, itemId: string, quantity: number},
    {rejectValue: string}
>("/cart/update/quantity", async ({cartId, itemId, quantity}, thunkApi) => {
    try {
        const res = await fetch(`${apiUrl}/api/cart/update/quantity/${itemId}/${cartId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({quantity: quantity})
        });

        const data = await res.json();
        if(data.error){
            return thunkApi.rejectWithValue(data.error);
        }


        return data;
    } catch (error) {
        console.error(error);
        return thunkApi.rejectWithValue((error as Error).message)
    }
})

export const removeFromCart = createAsyncThunk<
    ICartItem,
    {productId: string, cartId:  string},
    {rejectValue: string}
>("/cart/removeFromCart", async ({productId, cartId}, thunkApi) => {
    try {
        const res = await fetch(`${apiUrl}/api/cart/remove/${productId}/${cartId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include"
        })

        const data = await res.json();

        if(data.error){
            return thunkApi.rejectWithValue(data.error);
        }

        return data;
    } catch (error) {
        console.error(error);
        return thunkApi.rejectWithValue((error as Error).message);
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
        },
        setCart(state, action){
           console.log("Set cart")
            state.cart = action.payload
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
                if (!state.cart) return
                const index = state.cart?.items.findIndex(item => item.id === action.payload.id);
                if(index === -1) {
                    //not found
                    state.cart?.items.push(action.payload);
                }
                if (state.cart && index !== -1) {
                    state.cart.items[index] = action.payload;
                }


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
            .addCase(updateItemQuantity.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateItemQuantity.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                if(!state.cart) return

                const index = state.cart.items.findIndex(item  => item.id === action.payload.id);
                if(index === -1) return //item not found

                state.cart.items[index] = action.payload
            })
            .addCase(updateItemQuantity.rejected, (state, action)=> {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })
            .addCase(removeFromCart.pending, (state, action) => {
                state.isLoading = true
                
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.isLoading= false
                state.isSuccess = true
                if(!state.cart) return;
                const index = state.cart.items.findIndex(item => item.id === action.payload.id);

                if(index === -1) return //item does not exist in cart

                state.cart.items.splice(index, 1);
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })
            
    })
})



export const {reset, setCart} = cartSlice.actions;

export default cartSlice.reducer;