"use client"
import Spinner from '@/app/components/Spinner';
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux'
import { getMyOrders } from '@/app/store/orderSlice';
import { makePayment } from '@/app/store/paymentSlice';
import React, { useEffect } from 'react'

const Checkout = () => {
    const {myOrders} = useAppSelector(state => state.order);
    const dispatch = useAppDispatch();
    const {isLoading} = useAppSelector(state => state.payment);
    useEffect(()=>{
        dispatch(getMyOrders())
    }, [dispatch])
    
    return (
    <div className='max-w-7xl mx-auto min-h-[45vh]'>
        {myOrders?.length === 0 && <p className='text-4xl text-primary text-center'>No orders yet</p>}
        {myOrders?.map(order => <div key={order.id} className="max-w-lg border-1 mx-auto m-3 rounded p-3 border-primary">
            <h3 className='text-center font-bold'>Order summary</h3>
            {
                order?.items?.map(item => 
                    <div key={item.id} className="flex justify-between border-b border-b-slate-50/30">
                        <p>{item.product.name}: {item.product.price} * {item.quantity}</p>
                        <p>{item.product.price * item.quantity}</p>
                        
                    </div>
                    
                )
                
            }
            
            <div className="flex flex-col space-y-3">
                <div className="flex justify-between items-center">
                    <h3>Subtotal</h3>
                    <p>{order?.items?.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)}</p>

                </div>
                <div className="flex justify-between">
                    <p>Delivery fee</p>
                    <p>200</p>
                </div>
            </div>
            <div className="flex justify-between">
                <p className='font-bold'>Total</p>
                <p>{order?.items?.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) + 200}</p>
            </div>
            <button onClick={async () => {
                dispatch(makePayment({method: "MPESA", orderId: order.id}));
            }} className='bg-primary w-full text-white p-2 rounded mt-4 hover:bg-primary/50 cursor-pointer'>{
                isLoading? <Spinner/>: "Make payment"
            }</button>
        </div>)}
    </div>
  )
}

export default Checkout