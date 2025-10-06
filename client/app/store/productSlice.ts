import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../types";
import { apiUrl } from "../config/apiUrl";


type IInitialState = {
    products: IProduct[],
    currentProduct: IProduct | null 
    shopProducts: IProduct[],
    isLoading: boolean
    isSuccess: boolean
    isError: boolean,
    message: string
}

const initialState: IInitialState = {
    products: [],
    currentProduct: null,
    shopProducts: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}

export const createProduct = createAsyncThunk<
    IProduct,
    {product: FormData, shopId: string},
    {rejectValue: string}
>("/product/create", async ({product, shopId}, thunkApi) => {
    try {
        const res = await fetch(`${apiUrl}/api/product/create/${shopId}`, {
            method: "POST",
            credentials: "include",
            body: product
        });

        const data = await res.json();

        if(data.error){
            console.log(data.error)
            return thunkApi.rejectWithValue(data.error);
        }


        return data;
    } catch (error) {
        console.error(error);
        return thunkApi.rejectWithValue((error as Error).message);
    }
})
export const getAllProducts = createAsyncThunk<
    IProduct[],
    void,
    {rejectValue: string}
>
("/products/all", async (_, thunkApi) => {
    try {
        const res = await fetch(`${apiUrl}/api/product/all`, {
            method: "GET",
            headers: {
                "Content-type": 'application/json'
            },
            credentials: "include"
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


export const getSingleProduct = createAsyncThunk<
    IProduct,
    {productId: string},
    {rejectValue: string}
>("/product/single", async({productId}, thunkApi) => {
    try {
        
        const res = await fetch(`${apiUrl}/api/product/single/${productId}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include"
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

 

export const getShopProducts = createAsyncThunk<
    IProduct[],
    {shopId: string},
    {rejectValue: string}
>("/product/byShop", async ({shopId}, thunkApi) => {
    try {
        const res = await fetch(`${apiUrl}/api/product/byShop/${shopId}`, {
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

        return data;
    } catch (error) {
        console.error(error);
        return thunkApi.rejectWithValue((error as Error).message)
    }
})


export const editProduct =  createAsyncThunk<
    IProduct,
    {product: FormData, productId: string},
    {rejectValue: string}
>("/product/edit", async ({product, productId}, thunkApi) => {
    try {
        const res = await fetch(`${apiUrl}/api/product/update/${productId}`, {
            method: "PUT",
            credentials: "include",
            body: product
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
const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ""
        }
    },
    extraReducers: (builder => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products = action.payload
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.shopProducts = [action.payload, ...state.shopProducts];
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })
            .addCase(getShopProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getShopProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.shopProducts = action.payload
            })
            .addCase(getShopProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })
            .addCase(editProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.isLoading=  false
                state.isSuccess = true
                //update shopProducts
                const shopProductIndex = state.shopProducts.findIndex(product => product.id === action.payload.id);
                if(shopProductIndex === -1) return //product not found
                state.shopProducts[shopProductIndex] = action.payload;
                //update products
                const productIndex = state.shopProducts.findIndex(product => product.id === action.payload.id);
                if(productIndex === -1) return //product not found
                state.products[productIndex] = action.payload;
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })

            .addCase(getSingleProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSingleProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.currentProduct = action.payload
            })
            .addCase(getSingleProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError=  true
                state.message = action.payload as string
            })
    })
})


export const {reset} = productSlice.actions;

export default productSlice.reducer;