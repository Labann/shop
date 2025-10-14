"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Product from './Product'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { IProduct } from '../types'
import { getAllProducts } from '../store/productSlice'




const Featured = () => {
    
    const dispatch = useAppDispatch();
    const {products} = useAppSelector(state => state.product);
    const [data, setData] = useState<IProduct[]>([])
    useEffect(()=> {
        setData(products.filter(p => p.isFeatured === true))
    }, [products])
    useEffect(() => {
        dispatch(getAllProducts())
    }, [])
    
    
    return (
    <div className='max-w-7xl mx-auto p-4'>
        <div className="flex justify-between items-center">
            <h1 className='md:text-3xl text-2xl font-bold'>Featured Products</h1>
            <Link href="/products" className=''>
                <span className='md:hidden text-primary'>See all</span>
                <span className='hidden md:block bg-primary text-white px-6 rounded p-2'>view all</span>
            </Link>
        </div>

        <div className="grid grid-cols-2 min-h-[20vh] sm:grid-cols-3 lg:grid-cols-4 justify-center mx-auto gap-4 py-7">
            {
                 data.length !== 0 && data?.slice(0, 4).map( value => <Product 
                        key={value.id}
                        product={value}
                        />
                )
            } 
            {
                data.length === 0 && <p className="text-primary text-center w-full col-span-2 sm:col-span-3 lg:col-span-4 font-bold">no featured products yet!</p>
            } 
        </div>
    </div>
  )
}

export default Featured