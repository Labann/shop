"use client"
import Link from 'next/link'
import React from 'react'
import Product from './Product'




const Featured = () => {
    const data = [
        {
            item: "1"
        },
        {
            item: "2"
        },
        {
            item: "3"
        },
        {
            item: "4"
        }
    ]
  return (
    <div className='max-w-7xl mx-auto p-4'>
        <div className="flex justify-between items-center">
            <h1 className='md:text-3xl text-2xl font-bold'>Featured Products</h1>
            <Link href="" className=''>
                <span className='md:hidden text-primary'>See all</span>
                <span className='hidden md:block bg-primary text-white px-6 rounded p-2'>view all</span>
            </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 justify-center mx-auto gap-4 py-7">
            {
                data?.map( value => <Product key={value.item}/>
                )
            }  
        </div>
    </div>
  )
}

export default Featured