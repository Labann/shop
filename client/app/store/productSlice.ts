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

 
export const deleteProduct = createAsyncThunk<
    {deletedProduct: IProduct, message: string},
    {productId:string},
    {rejectValue: string}
>("/product/delete", async ({productId}, thunkApi) => {
    try {
        const res = await fetch(`${apiUrl}/api/product/delete/${productId}`, {
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

export const getProductsByCategory = createAsyncThunk<
    IProduct[],
    {category: string},
    {rejectValue: string}
>("/product/byCategory", async ({category}, thunkApi) => {
    try {
        const res = await fetch(`${apiUrl}/api/product/category/${category}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })    

        const data = await res.json();
        
        return data;
    } catch (error) {
        return thunkApi.rejectWithValue((error as Error).message);
    }}
)

export const searchProducts = createAsyncThunk<
    IProduct[],
    {search: string},
    {rejectValue: string}
>("/product/search", async ({search}, thunkApi) => {
    try {
        const res = await fetch(`${apiUrl}/api/product/search/${search}`,{
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
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
export const toggleIsFeatured = createAsyncThunk<
    {message: string, updatedProduct: IProduct},
    {productId: string},
    {rejectValue: string}
>("/product/toggle_isFeatured", async ({productId}, thunkApi) => {
    try {
        const res = await fetch(`${apiUrl}/api/product/toggle_isFeatured/${productId}`, {
            method: "PUT",
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
        return thunkApi.rejectWithValue((error as Error).message);
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
            .addCase(deleteProduct.pending, state=> {
                state.isLoading = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) =>{
                state.isLoading = false
                state.isSuccess = true
                //delete product in shopProducts
                const shopProductIndex = state.shopProducts.findIndex(product => product.id === action.payload.deletedProduct.id);
                if(shopProductIndex === -1) return //product not found
                state.shopProducts.splice(shopProductIndex, 1);
                //delete product in main products
                const productIndex = state.shopProducts.findIndex(product => product.id === action.payload.deletedProduct.id);
                if(productIndex === -1) return //product not found
                state.products.splice(productIndex, 1);
            })
            .addCase(toggleIsFeatured.pending, state => {
                state.isLoading  = true
            })
            .addCase(toggleIsFeatured.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                const index = state.products.findIndex(p => p.id === action.payload.updatedProduct.id)
                if(index === -1) return
                state.products[index] = action.payload.updatedProduct
            })
            .addCase(toggleIsFeatured.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
            })
            .addCase(getProductsByCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProductsByCategory.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products = action.payload
            })
            .addCase(getProductsByCategory.rejected, (state, action) => {
                state.isLoading = false
                state.isError= true
                state.message = action.payload as string
            })
            .addCase(searchProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products = action.payload
            })
    })
})




export const {reset} = productSlice.actions;

export default productSlice.reducer;