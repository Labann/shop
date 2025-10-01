"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const Cart = () => {
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
    ]
  return (
    <div className='max-w-7xl mx-auto p-4'>
        <div className="flex items-center space-x-2">
            <Link href={"/"} className='text-slate-300 text-sm'>Home /</Link>
            <span className='text-primary'>Cart</span>
            <p className='pl-10'>3 items</p>
        </div>
        <div className="py-6 min-h-[45vh]">
            {data.map(value => <div key={value.id} className="bg-gray-200 my-3  rounded-md p-3 flex flex-row items-center">
                <div className="flex flex-col justify-center items-center space-y-3">
                    <div className="w-[8em] flex justify-center items-center">
                        <Image
                            src={"/shoe.png"}
                            width={100}
                            height={100}
                            alt='product-img'
                        />
                        
                    </div>
                    <p className='text-red-400  text-center'>Remove</p>

                </div>
                <div className="flex flex-col space-y-3 md:flex-row justify-between flex-1 sm:pl-20 md:pl-44">
                    <div className="flex flex-col space-y-3 font-bold">
                            <h3>Nike Air</h3>
                            <p><span className='text-primary'>Seller : </span> Nike Air</p>
                    </div>
                    <div className="bg-primary text-white rounded flex items-center justify-center px-4 space-x-3 h-10 max-w-[6em]">
                            <button className=' focus:text-white rounded cursor-pointer'>-</button>
                            <span className=' focus:text-white rounded text-xs'>01</span>
                            <button className=' focus:text-white  rounded cursor-pointer'>+</button>
                    </div>

                    <p className='font-bold'>KSH 3000</p>
                </div>
                
            </div>)}
        </div>

        <div className="flex items-center justify-between py-4">
            <Link href={"/"} className='p-2 border-primary px-6 cursor-pointer border-1 rounded-md'>Go back</Link>
            <button className='border-primary border-1 p-2 rounded-md px-6 cursor-pointer'>Update Cart</button>
        </div>

        <div className="flex flex-row-reverse py-6">
            <div className="border-2 border-primary/30 w-sm rounded p-4 flex flex-col space-y-6">
                <h3 className='font-semibold'>Cart Totals</h3>
                <div className="flex items-center justify-between">
                    <p className='text-primary'>Subtotal</p>
                    <p className='font-bold'>KSH 2000</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className='text-primary'>Delivery fee</p>
                    <p className='font-bold'>KSH 200</p>
                </div>
                <div className="border-1 border-slate-300/30"></div>
                <button className='bg-primary cursor-pointer mt-4 rounded-md p-3 text-white font-semibold'>Proceed to Checkout</button>
            </div>
        </div>
    </div>
  )
}

export default Cart