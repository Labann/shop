import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPayment } from "../types";
import { apiUrl } from "../config/apiUrl";

interface IInitialState{
    payment: IPayment[],
    isLoading: boolean
    isError: boolean
    isSuccess: boolean
    message: string
}


export const makePayment = createAsyncThunk<
    IPayment,
    {method: "MPESA" | "CARD", orderId: string}
>("/payment/initiate", async ({
    method,
    orderId
}, thunkApi) => {
    try {
        const res = await fetch(`${apiUrl}/api/mpesa/stkPush`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({orderId, method})
        });

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
const initialState: IInitialState = {
    payment: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}

const paymentSlice = createSlice({
    name: "payment",
    initialState: initialState,
    reducers: {
        reset: (state) =>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ""
        }
    },
    extraReducers: (builder => {
        builder
            .addCase(makePayment.pending, (state) => {
                state.isLoading  = true
            })
            .addCase(makePayment.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.payment = [action.payload, ...state.payment]
            })
            .addCase(makePayment.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })
    })
})


export const {reset} = paymentSlice.actions;

export default paymentSlice.reducer;