"use client"
import React from 'react'
import Image from "next/image"
import { GrFavorite } from "react-icons/gr";
import { IProduct } from '../types';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { makeWish, unWish } from '../store/wishSlice';


const Product = ({product}:{
    product: IProduct
}) => {
    const {wish} = useAppSelector(state => state.wish)
    const dispatch = useAppDispatch();
    if(!product) return;
  return (
    <div className="flex flex-col space-y-2 max-w-15em">
        <div className="relative bg-gray-100 h-[12em] w-full md:h-[15em] flex justify-center items-center">
            <div className="rounded-full bg-white p-1 absolute top-2 right-2">
                {wish && wish.some(item => item.id === product.id) && <GrFavorite onClick={() => dispatch(unWish(product))} className='cursor-pointer bg-red-600'/>}
            
                {wish && wish.some(item => item.id !== product.id) && <GrFavorite onClick={() => dispatch(makeWish(product))} className='cursor-pointer'/>}
                {!wish && <GrFavorite onClick={() => dispatch(makeWish(product))} className='cursor-pointer'/>}
            </div>
            
            {product.images.length !== 0 && <Image
                alt="product-img"
                width={100}
                height={100}
                unoptimized
                src={product.images[0]}
                className='w-[7em] h-[7em]'
            />}
        </div>
        <div className="flex flex-col space-y-2">
            <h3 className='font-extrabold'>{product.name}</h3>
            <span className='text-primary font-bold'>{product.price}</span>
            <Link href={`/products/${product.id}`} className='w-full bg-primary hover:bg-primary/70 p-2 text-white rounded text-center'>view product</Link>
        </div>
    </div>
  )
}

export default Product