"use client"
import { useSearchParams} from "next/navigation"
import {useEffect, useState}  from "react"
import { CiSearch } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getAllProducts, searchProducts } from "../store/productSlice";
import Product from "../components/Product";
import ProductLoader from "../components/ProductLoader";

const Products = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const {products, isLoading} = useAppSelector(state => state.product);
    const [search, setSearch] = useState<string>("");
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if(query){
            setSearch(query);
            dispatch(searchProducts({search: query}))

            // Clear query params from URL (without reload)
            const cleanUrl = window.location.pathname;
            window.history.replaceState({}, "", cleanUrl);
        }else{
            dispatch(getAllProducts())
        }
    }, [query, dispatch])
    useEffect(() => {
        if (!search || query === search) return;
        
        dispatch(getAllProducts());
        
        const delay = setTimeout(() => {
                dispatch(searchProducts({ search }));
        }, 3000);
        
        return () => clearTimeout(delay);
    }, [search, dispatch, query])
    return(
        <div className="max-w-7xl mx-auto p-3 min-h-screen">
            <div className="max-w-lg mx-auto relative text-slate-600 rounded-md overflow-hidden w-full">
                <CiSearch
                    size={"1.5em"}
                    className='absolute left-0 top-3 cursor-pointer'
                />
                <input 
                    type="text"
                    name="search" 
                    id="search"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    className='bg-gray-100 flex-1 text-xl border-0 focus:outline-none h-full p-2 pl-8 w-full'
                    placeholder='Search products'
                    />
            </div>
            <div className="mx-auto py-6 w-fit  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {
                    products.length === 0 && !isLoading && (
                        <p className="font-bold text-center text-primary">No products found</p>
                    )
                }
                {
                    isLoading && ["1","2", "3", "4", "5", "6", "7", "8"].map(item => <ProductLoader key={item}/>)
                }
                {
                    !isLoading && products?.map(product => <Product key={product.id} product={product}/>)
                }
            </div>
        </div>
    )
}


export default Products;