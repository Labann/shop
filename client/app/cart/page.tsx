"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { getMyCart } from '../store/cartSlice'
import CartItemCard from '../components/CartItemCard'
import { getMyOrders, makeOrder } from '../store/orderSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'


const Cart = () => {
    
    const dispatch = useAppDispatch();
    const [total, setTotal] = useState(0);
    const {message} = useAppSelector(state => state.order)
    const {cart} = useAppSelector(state => state.cart);
    const {myOrders, isLoading} = useAppSelector(state => state.order);
    
    useEffect(()=>{
        dispatch(getMyCart());
        dispatch(getMyOrders());
    }, [dispatch]);

    
    
    useEffect(() => {
        if(cart && cart.items.length !== 0){
            const ids = myOrders.flatMap(order => order.items.map(item => item.cartItemId))
            
            const cartItems = cart.items;
            const filtered = cartItems.filter(item => !ids.includes(item.id));
            
            console.log("CartItems:", filtered);
            setTotal(filtered?.reduce((acc, item) => acc + (item.product.price * item.quantity), 0))
        }
    }, [cart, myOrders])
    
        
    
    const createOrder = async () => {
        if(cart && cart.items.length !== 0){
            const ids = myOrders.flatMap(order => order.items.map(item => item.cartItemId))
            
            const cartItems = cart.items;
            const filtered = cartItems.filter(item => !ids.includes(item.id));
            
            const action = await dispatch(makeOrder(filtered));
            if(action.type === "/order/create/fulfilled"){
                toast.success("order created successfully")
            }
            if(action.type === "/order/create/rejected"){
                toast.error(message)
            }
            
        }
        
    }

    const ids = myOrders.flatMap(order => order.items.map(item => item.cartItemId))
            
    const cartItems = cart?.items;
    const filtered = cartItems?.filter(item => !ids.includes(item.id));
  return (
    <div className='max-w-7xl mx-auto p-4'>
        <div className="flex items-center space-x-2">
            <Link href={"/"} className='text-slate-300 text-sm'>Home /</Link>
            <span className='text-primary'>Cart</span>
            <p className='pl-10'>{cart?.items?.length} items</p>
        </div>
        <div className="py-6 min-h-[45vh]">
            {!cart || cart?.items?.length === 0 &&  <p className='text-center font-bold text-3xl text-primary'>Cart is empty!</p>}
            {cart && cart?.items?.map(item => <CartItemCard key={item?.id} item={item}/>)}
        </div>

        

        <div className="flex flex-row-reverse py-6">
            <div className="border-2 border-primary/30 w-sm rounded p-4 flex flex-col space-y-6">
                <h3 className='font-semibold'>Cart Totals</h3>
                <div className="flex items-center justify-between">
                    <p className='text-primary'>Subtotal</p>
                    <p className='font-bold'>KSH {total}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className='text-primary'>Delivery fee</p>
                    <p className='font-bold'>KSH 200</p>
                </div>
                
                <div className="border-1 border-slate-300/30"></div>
                <div className='flex flex-row-reverse w-full space-x-3'>
                    <p className='font-bold text-green-300'>{total + 200}</p>
                    <span className='font-bold text-primary pr-1'>Total:</span>
                    
                </div>
                <button onClick={createOrder} className={`${filtered?.length === 0 && `pointer-events-none bg-primary/30`} bg-primary cursor-pointer mt-4 rounded-md p-3 text-white font-semibold hover:bg-primary/30`}>{
                    isLoading? <Spinner/>: "Place order"
                }</button>
            </div>
            
        </div>
        {myOrders.length !== 0 && <div className="flex flex-row-reverse w-sm rounded">
                <Link href={"/cart/checkout"} className='bg-primary p-2'>proceed to checkout</Link>
        </div>}
    </div>
  )
}

export default Cart