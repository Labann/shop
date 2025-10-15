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
  if(!name) throw Error("name of category is required");
  useEffect(() => {
    if(name && typeof(name) === "string"){
      dispatch(getProductsByCategory({category: name}))
    }
  }, [name, dispatch]);
  return (
    <div className='max-w-7xl mx-auto'>
        <h1><Link href={"/"}>home</Link> / <span className='font-bold text-primary'>{}</span></h1>
        <div className="grid w-fit sm:w-auto md:grid-cols-3">
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