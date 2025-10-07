import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IShop } from "../types";
import { apiUrl } from "../config/apiUrl";
import { getAllProducts } from "./productSlice";


type IInitialState = {
    shops: IShop[],
    myShops: IShop[],
    applications: IShop[]
    newShop: IShop | null,
    isLoading: boolean,
    isError: boolean
    isSuccess: boolean
    message: string
}

export const approveShop = createAsyncThunk<
    IShop,
    {shopId: string},
    {rejectValue: string}
>("/shop/approve", async ({shopId}, thunkApi) => {
    try {
        const res = await fetch(`${apiUrl}/api/shop/approve/${shopId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include"
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

export const getMyShops = createAsyncThunk<
    IShop[],
    {userId: string},
    {rejectValue: string}
>("/shop/me", async ({userId}, thunkApi) => {
    try {
        const res = await fetch(`${apiUrl}/api/shop/my-shops/${userId}`, {
            method: "GET",
            headers: {
                "Content-type": "applications/json"
            },
            credentials: "include",
            
        });

        const data = await res.json();

        if(data.error){
            return thunkApi.rejectWithValue(data.error)
        }

        return data;
    } catch (error) {
        console.error(error);
        return thunkApi.rejectWithValue((error as Error).message)
    }
})


export const getApplications = createAsyncThunk<
    IShop[],
    void,
    {rejectValue: string}
>("/shop/applications", async (_, thunkApi) => {
    try {
        const res = await fetch(`${apiUrl}/api/shop/applications`, {
            method: "GET",
            headers: {
                "Content-type": "applications/json"
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
const initialState: IInitialState = {
    shops: [],
    myShops: [],
    applications: [],
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

            .addCase(getMyShops.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMyShops.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                
                state.myShops = action.payload

                
            })
            .addCase(getMyShops.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })

            .addCase(approveShop.pending, (state) => {
                state.isLoading = true
            })
            .addCase(approveShop.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                
                const applicationsIndex = state.applications.findIndex(shop => shop.id === action.payload.id)
                
                state.applications.splice(applicationsIndex, 1);
            }) 
            .addCase(approveShop.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })
            .addCase(getApplications.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getApplications.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.applications = action.payload
            })

            .addCase(getApplications.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })
    }
})



export const {reset} = shopSlice.actions;
export default shopSlice.reducer;