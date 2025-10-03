import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {IUser} from "../types/index"
import { apiUrl } from "../config/apiUrl";
type IInitialState = {
    currentUser: IUser| null,
    isLoading: boolean,
    isError: boolean
    isSuccess: boolean
    message: string
}

export const login = createAsyncThunk<
    IUser,
    {email: string, password: string},
    {rejectValue: string}
>("/auth/login", async (user, thunkApi) => {
    try {
        const res = await fetch(`${apiUrl}/api/user/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(user)
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
const initialState: IInitialState = {
    currentUser: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}

export const signup = createAsyncThunk<
    IUser,
    {email: string, password: string, fullname: string, username: string},
    {rejectValue: string}
>("/auth/signup", async (user, thunkApi) => {
    try {
        const res  = await fetch(`${apiUrl}/api/user/signup`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(user)
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

export const getProfile = createAsyncThunk<
    IUser,
    {username: string},
    {rejectValue: string}
>("/user/profile", async (username, thunkApi) => {
    try {
        const res = await fetch(`${apiUrl}/user/profile`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(username)
        });
        const data = await res.json();

        if(data.error){
            return thunkApi.rejectWithValue(data.error)
        }

        return data
    } catch (error) {
        console.error(error);
        return thunkApi.rejectWithValue((error as Error).message);
    }
})
const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        reset: (state) => {
            state.currentUser = null
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ""
        },
    },
    extraReducers: (builder => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = false
            })
            .addCase(login.fulfilled,(state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.currentUser = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            } )
            .addCase(signup.pending, (state) => {
                state.isLoading = false
            })
            .addCase(signup.fulfilled,(state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.currentUser = action.payload
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })
    })
})



export const { reset} = authSlice.actions;
export default authSlice.reducer