import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../types";


interface IInitialState {
    wish: IProduct[] | null,
    isError: boolean,
    isLoading: boolean
    isSuccess: boolean,
    message: string
}
const initialState: IInitialState = {
    wish: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
}

export const makeWish = createAsyncThunk<
    IProduct,
    IProduct,
    {rejectValue: string}
>("/wish/make", async (product, thunkApi) => {
    try {
        return product;
    } catch (error) {
        console.error(error);
        return thunkApi.rejectWithValue((error as Error).message)
    }
})
export const unWish =  createAsyncThunk<
    IProduct,
    IProduct,
    {rejectValue: string}
>("/wish/unwish", async (product, thunkApi) => {
    try {
        return product
    } catch (error) {
        console.error(error);
        return thunkApi.rejectWithValue((error as Error).message)
    }
})
const wishSlice = createSlice({
    name: "wish",
    initialState: initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
        }
    },
    extraReducers: (builder => {
        builder
            .addCase(makeWish.pending, (state) => {
                state.isLoading = true
            })
            .addCase(makeWish.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                if(!state.wish) {
                    state.wish = [action.payload]
                    localStorage.setItem("wish", JSON.stringify(state.wish))    
                }
                state.wish = [action.payload, ...state.wish]

                localStorage.setItem("wish", JSON.stringify(state.wish))
            })
            .addCase(makeWish.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })
            .addCase(unWish.pending, (state) => {
                state.isLoading = true
            })
            .addCase(unWish.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                if(!state.wish) return;
                
                const index = state.wish.findIndex(wish => wish.id === action.payload.id);

                if(index === -1) return //does not exist in wishList

                state.wish.slice(index, 1);

                localStorage.setItem("wish", JSON.stringify(state.wish));
            })
    })
})

export const {reset} = wishSlice.actions;

export default wishSlice.reducer