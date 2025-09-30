"use client"
import React from 'react'
import Image from "next/image"
import { GrFavorite } from "react-icons/gr";


const Product = ({img}:{
    img: string
}) => {
    if(!img) return
  return (
    <div className="flex flex-col space-y-2 max-w-[15em]">
        <div className="relative bg-gray-100 h-[12em] w-full md:h-[15em] flex justify-center items-center">
            <div className="rounded-full bg-white p-1 absolute top-2 right-2">
                <GrFavorite className='cursor-pointer'/>
            </div>
            
            <Image
                alt="product-img"
                width={100}
                height={100}
                src={img}
                className='w-[7em]'
            />
        </div>
        <div className="flex flex-col space-y-2">
            <h3 className='font-extrabold'>HP ELITE BOOK</h3>
            <span className='text-primary font-bold'>KSH 3000</span>
            <span></span>
        </div>
    </div>
  )
}

export default Product