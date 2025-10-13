import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {IUser} from "../types/index"
import { apiUrl } from "../config/apiUrl";
import { useAppDispatch } from "../hooks/redux";
import { createCart } from "./cartSlice";
import { stat } from "fs";
type IInitialState = {
    currentUser: IUser| null,
    isLoading: boolean,
    isError: boolean
    isSuccess: boolean
    message: string
}

export const loginV2 = createAsyncThunk<
    void,
    void,
    {rejectValue: string}
>("/auth/login/v2",async (_, thunkApi) => {
    try {
        window.location.href = `${apiUrl}/api/user/v2/login`;
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue((error as Error).message)  
    }
})

export const getMe = createAsyncThunk<
    IUser,
    void,
    {rejectValue: string}
>("/auth/me", async (_, thunkApi) => {
    try{
        const res = await fetch(`${apiUrl}/api/user/me`, {
            method: "GET",
            headers: {"Content-type": "application/json"},
            credentials: "include"
        });

        const data = await res.json();

        if(data.error){
            return thunkApi.rejectWithValue(data.error);
        }

        localStorage.setItem("user", JSON.stringify(data));
        return data
    }catch(error){
        console.error(error);
        return thunkApi.rejectWithValue((error as Error).message);
    }
})
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
        localStorage.setItem("user" ,JSON.stringify(data))
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
    {
        email: string, 
        password: string, 
        firstName: string, 
        lastName: string, 
        username: string , 
        confirm: string},
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
        
        localStorage.setItem("user" ,JSON.stringify(data))
        return data;
    } catch (error) {
        console.error(error);
        return thunkApi.rejectWithValue((error as Error).message)
    }
})

export const logout = createAsyncThunk
<
    {message: string},
    void,
    {rejectValue: string}
>("/auth/logout", async (_, thunkApi) => {
    try {
        const res = await fetch(`${apiUrl}/api/user/logout`, {
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
        localStorage.removeItem("user");
        return data;
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
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ""
        },
        setUser(state, action){
            state.currentUser = action.payload
        }
    },
    extraReducers: (builder => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
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
                state.isLoading = true
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
            .addCase(logout.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
                state.currentUser = null
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })
            .addCase(loginV2.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginV2.fulfilled, (state) => {
                state.isLoading= false
                state.isSuccess = true
            })
            .addCase(loginV2.rejected, (state, action) => {
                state.isLoading=  false
                state.isError = true
                state.message = action.payload as string
            })
            .addCase(getMe.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = false
                state.currentUser = action.payload
                state.isSuccess = true
            })
            .addCase(getMe.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })
    })
    
})



export const { reset, setUser} = authSlice.actions;
export default authSlice.reducer