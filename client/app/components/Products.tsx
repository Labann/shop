"use client"
import React, { useEffect } from 'react'
import Link from "next/link"
import Product from './Product'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { getAllProducts, reset } from '../store/productSlice'
const Products = () => {
    const{products} = useAppSelector(state => state.product);
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(getAllProducts())
        return () => {
            dispatch(reset())
        }
    }, [dispatch]);
  return (
    <div className='max-w-7xl mx-auto p-4'>
        <div className="flex justify-between items-center">
            <h1 className='md:text-3xl text-2xl font-bold'>Explore Products</h1>
            <Link href="" className=''>
                <span className='md:hidden text-primary'>See all</span>
                <span className='hidden md:block bg-primary text-white px-6 rounded p-2'>view all</span>
            </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 justify-center mx-auto gap-4 py-7">
            {
                products.length !== 0 && products.slice(0, 4)?.map( product => <Product 
                        key={product.id}
                        product ={product}
                        
                        />
                )
            }  
        </div>
    </div>
  )
}

export default Products