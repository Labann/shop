"use client"
import {useParams, useRouter, useSearchParams} from "next/navigation"
import {useEffect, useState}  from "react"
import { CiSearch } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getAllProducts, searchProducts } from "../store/productSlice";
import Product from "../components/Product";

const Products = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const {products} = useAppSelector(state => state.product);
    const [search, setSearch] = useState<string>("");
    const dispatch = useAppDispatch();
    const router = useRouter();
    useEffect(() => {
        if(query){
            setSearch(query);
            const cleanUrl = window.location.pathname; 
            window.history.replaceState({}, "", cleanUrl);
        }
        dispatch(getAllProducts());
        if(search){
            setTimeout(() => dispatch(searchProducts({search})), 1000)
        }
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
            <div className="mx-auto py-6 self-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {
                    products.length === 0 && (
                        <p className="font-bold text-center text-primary">No products found</p>
                    )
                }
                {
                    products?.map(product => <Product key={product.id} product={product}/>)
                }
            </div>
        </div>
    )
}


export default Products;