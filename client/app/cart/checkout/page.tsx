"use client"
import Spinner from '@/app/components/Spinner';
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux'
import { cancelOrder, getMyOrders } from '@/app/store/orderSlice';
import { makePayment } from '@/app/store/paymentSlice';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Checkout = () => {
    const [number, setNumber] = useState<string>("")
    const {myOrders} = useAppSelector(state => state.order);
    const dispatch = useAppDispatch();
    const {isLoading} = useAppSelector(state => state.payment);
    useEffect(()=>{
        dispatch(getMyOrders())
    }, [dispatch])
    
    async function submit(e: React.FormEvent){
        //payment
    }
    const [isCancelling, setIsCancelling] = useState(false);
    async function cancel(orderId: string){
        setIsCancelling(true)
        const action = await dispatch(cancelOrder({orderId}))
        setIsCancelling(false)
        if(action.type === "/order/cancel/fulfilled"){
            toast.success("cancel successfully")
        }

        if(action.payload === "/order/cancel/rejected"){
            toast.error("cancel failed");
        }
    }
    
    return (
    <div className='max-w-7xl mx-auto min-h-[45vh]'>
        {myOrders?.length === 0 && <p className='text-4xl text-primary text-center'>No orders yet</p>}
        {myOrders?.map(order => <><form key={order.id} className={`${order.status === "CANCELLED" && "pointer-events-none bg-gray-100/30"} max-w-lg border-1 mx-auto m-3 rounded p-3 border-primary`}>
            {order.status === "CANCELLED" && <p className='text-red-600'>order cancelled</p>}
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
            <input 
                    type="mobile" 
                    placeholder='07xxxxxxxx' 
                    required
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className='w-full p-3'
                    />
            <button type='submit' onClick={async (e) => {
                e.preventDefault();
        
                const action = await dispatch(makePayment({method: "MPESA", orderId: order.id, mpesaNumber: number}));
                if(action.type === "/payment/initiate/fulfilled"){
                    toast.success("payment initiated")
                }
                if(action.type === "/payment/initiate/rejected"){
                    toast.error(action.payload as string)
                }
            }} className='bg-primary w-full text-white p-2 rounded mt-4 hover:bg-primary/50 cursor-pointer'>{
                isLoading? <Spinner/>: "Make payment"
            }</button>
        </form>
        <button key={order.id} onClick={() => cancel(order.id)} className='p-2 cursor-pointer bg-red-600 hove:bg-red-700 text-white w-lg mx-auto'>
            {isCancelling ? <Spinner/>: "Cancel"}
        </button>
        </>
    )}
    </div>
  )
}

export default Checkout