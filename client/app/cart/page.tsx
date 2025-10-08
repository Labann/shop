"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { getCartItems } from '../store/cartSlice'
import CartItemCard from '../components/CartItemCard'
const Cart = () => {
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(getCartItems());
    }, []);

    const {cart} = useAppSelector(state => state.cart);
    
  return (
    <div className='max-w-7xl mx-auto p-4'>
        <div className="flex items-center space-x-2">
            <Link href={"/"} className='text-slate-300 text-sm'>Home /</Link>
            <span className='text-primary'>Cart</span>
            <p className='pl-10'>{cart?.items?.length} items</p>
        </div>
        <div className="py-6 min-h-[45vh]">
            {cart && cart.items.length === 0 &&  <p className='text-center font-bold text-3xl text-primary'>Cart is empty!</p>}
            {cart && cart.items.map(item => <CartItemCard key={item.id} item={item}/>)}
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