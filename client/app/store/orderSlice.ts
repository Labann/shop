import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICartItem, IOrder, IOrderItem } from "../types";
import { apiUrl } from "../config/apiUrl";

interface IInitialState{
    myOrders: IOrder[] 
    isLoading: boolean
    isError: boolean
    isSuccess: boolean
    message: string
}

const initialState: IInitialState = {
    myOrders: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
}


export const getMyOrders = createAsyncThunk<
IOrder[],
void,
{rejectValue: string}
>("/order/my_orders", async (_ , thunkApi) => {
    try {
        const res = await fetch(`${apiUrl}/api/order/my-orders`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include"
        })

        const data = await res.json();

        if(data.error){
            return thunkApi.rejectWithValue(data.error);
        }

        localStorage.setItem("order", JSON.stringify(data))
        
        return data;
    } catch (error) {
        console.error(error);
        return thunkApi.rejectWithValue((error as Error).message);
    }
})

export const makeOrder = createAsyncThunk<
{fullOrder: IOrder, message: string},
ICartItem[],
{rejectValue: string}
>("/order/create", async (items, thunkApi) => {
    try {
        const res = await fetch(`${apiUrl}/api/order/create`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({items})
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
const orderSlice = createSlice({
    name: "order",
    initialState: initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ""
        },
        setOrder: (state, action) => {
            state.myOrders = action.payload
        }
    },
    extraReducers: (builder => {
        builder
            .addCase(makeOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(makeOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.myOrders.unshift(action.payload.fullOrder)
                localStorage.setItem("order", JSON.stringify(state.myOrders))
            })
            .addCase(makeOrder.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })
            .addCase(getMyOrders.pending, (state) => {
                state.isLoading= true
            })
            .addCase(getMyOrders.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.myOrders = action.payload
            })
            .addCase(getMyOrders.rejected, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.message = action.payload as string
            })
    })
})



export const {reset, setOrder} = orderSlice.actions;

export default orderSlice.reducer