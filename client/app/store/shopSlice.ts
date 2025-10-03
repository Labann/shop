import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IShop } from "../types";
import { apiUrl } from "../config/apiUrl";


type IInitialState = {
    shops: IShop[] ,
    newShop: IShop | null,
    isLoading: boolean,
    isError: boolean
    isSuccess: boolean
    message: string
}
export const applyShop = createAsyncThunk<
    IShop,
    FormData,
    {rejectValue: string}
>("/shop/apply", async (shop, thunkApi) => {
    try {
        const res = await fetch(`${apiUrl}/api/shop/apply`, {
            method: "POST",
            credentials: "include",
            body: shop
        });

        const data = await res.json();

        if(data.error){
            return thunkApi.rejectWithValue(data.error)
        }

        return data;
    } catch (error) {
        console.error(error);
        return thunkApi.rejectWithValue((error as Error).message);
    }
})
const initialState: IInitialState = {
    shops: [],
    newShop: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}
const shopSlice = createSlice({
    name: "shop",
    initialState: initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ""
        }   
    },
    extraReducers: (builder) => {
        builder
            .addCase(applyShop.pending, (state) => {
                state.isLoading = true
            })
            .addCase(applyShop.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.newShop = action.payload
            })
            .addCase(applyShop.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })
    }
})



export const {reset} = shopSlice.actions;
export default shopSlice.reducer;