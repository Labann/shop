"use client"
import React from 'react'
import Link from "next/link"
import Image from 'next/image'
import Featured from '../components/Featured'
const WishList = () => {
    const data = [
        {
            id: 0
        },
        {
            id: 1
        },
        {
            id: 2
        },
        {
            id: 3
        },
    ]
  return (
    <div className='max-w-7xl mx-auto p-4'>
        <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-slate-300">Home /</Link>
            <span className='font-semibold'>Wishlist</span>
            <p className='pl-10 font-semibold'>4 items</p>
        </div>
        <div className="py-10 min-h-[45vh]">
            {
                data.map(value => <div key={value.id} className="flex my-3 space-x-2 border-b-3 border-slate-300/30  py-6">
                    <div className="flex flex-col space-y-3">
                        <div className="w-[10em] bg-slate-300 rounded-md">
                            <Image 
                                alt='product-img'
                                src={"/shoe.png"}
                                width={300}
                                height={300}
                                className=''
                                />
                        </div>
                        <div className="text-red-400 flex justify-center items-center">
                            <button className='focus:underline cursor-pointer'>Remove</button>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col md:flex-row  md:pl-10">
                        <div className="flex-1 flex flex-row md:flex-col justify-between">
                            <p className='font-semibold md:text-xl text-sm'>Product name</p>
                            <p className='underline text-green-600 font-bold text-xs md:text-sm'>In Stock</p>
                        </div>
                        <div className="flex flex-row md:flex-col justify-between">
                            <p className='md:text-xl font-bold'>Ksh 30000</p>
                            <button className='bg-primary text-xs p-1 md:p-2 rounded-md text-white md:w-full'>Buy Now</button>
                        </div>
                    </div>
                    
                </div>
                )
            }
        </div>
        <Featured />
    </div>
  )
}

export default WishList