"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux'
import { getProductsByCategory } from '@/app/store/productSlice'
import ProductLoader from '@/app/components/ProductLoader'
import Product from '@/app/components/Product'
const Categories = () => {
  const {isLoading, products} = useAppSelector(state => state.product);
  const params = useParams();
  const {name} = params
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if(name && typeof(name) === "string"){
      dispatch(getProductsByCategory({category: name}))
    }
  }, [name, dispatch]);
  
  return (
    <div className='max-w-7xl mx-auto min-h[75vh]'>
        <h1><Link href={"/"}>home</Link> / <span className='font-bold text-primary text-2xl'>{name}</span></h1>
        {products.length === 0 && <span className="font-bold text-primary">no products of type {name} found</span>}
        <div className="grid w-fit sm:w-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-6 gap-7 mx-auto">
          {
              isLoading  && (
                [1, 2, 3, 4, 5, 6].map(item => <ProductLoader key={item}/>)
              )
            }
          {
            products?.map(product => <Product product={product} key={product.id}/>)
          }
        </div>
        

    </div>
  )
}

export default Categories