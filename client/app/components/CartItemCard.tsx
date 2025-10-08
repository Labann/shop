"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ICartItem } from '../types'
import { removeFromCart, updateItemQuantity } from '../store/cartSlice'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { toast } from 'react-toastify'
import Spinner from './Spinner'

const CartItemCard = ({item}: {
    item: ICartItem
}) => {
    
    const dispatch = useAppDispatch();
    const [quantity, setQuantity] = useState(1);
    const {cart, message} = useAppSelector(state => state.cart);
    useEffect(()=> {
        setQuantity(item.quantity);
    }, [item])
    const [isRemoving, setIsRemoving] = useState(false);
    if(!cart || !item) return <div className="min-h-[45vh] text-primary font-bold">no cart || item</div>
  return (
    <div  className="bg-gray-200 my-3  rounded-md p-3 flex flex-row items-center">
                <div className="flex flex-col justify-center items-center space-y-3">
                    <div className="w-[8em] flex justify-center items-center">
                        <Image
                            src={item.product.images[0]}
                            unoptimized
                            width={100}
                            height={100}
                            alt='product-img'
                        />
                        
                    </div>
                    {isRemoving? <Spinner/>: <button className='text-red-400  text-center hover:bg-red-600 hover:text-white p-1 rounded cursor-pointer'
                        onClick={async () => {
                            setIsRemoving(true)
                            const action = await dispatch(removeFromCart({cartId: cart.id, productId: item.product.id}))
                            setIsRemoving(false)
                            if(action.type === "/cart/removeFromCart/fulfilled"){
                                toast.success("item removed from cart")
                            }
                            if(action.type === "/cart/removeFromCart/rejected"){
                                toast.error(message);
                            }
                        }
                        }
                    >Remove</button>}

                </div>
                <div className="flex flex-col space-y-3 md:flex-row justify-between flex-1 sm:pl-20 md:pl-44">
                    <div className="flex flex-col space-y-3 font-bold">
                            <h3>{item.product.name}</h3>
                            <p><span className='text-primary'>Seller : </span> {item.product.shop.name}</p>
                    </div>
                    <div className="bg-primary text-white rounded flex items-center justify-center px-4 space-x-3 h-10 max-w-[6em]">
                            <button onClick={async () => {
                                setQuantity( prev => {
                                    const newQuantity = prev - 1;
                                    dispatch(updateItemQuantity({itemId: item.id, quantity: newQuantity, cartId: cart.id}))
                                    return newQuantity
                                })
                                
                            }
                            } className={`${quantity  < 2 && `pointer-events-none `} focus:text-white  rounded cursor-pointer`}>-</button>
                            <span className=' focus:text-white rounded text-xs'>{quantity}</span>
                            <button onClick={async () => {
                                setQuantity( prev => {
                                    const newQuantity = prev + 1;
                                    dispatch(updateItemQuantity({itemId: item.id, quantity: newQuantity, cartId: cart.id}))
                                    return newQuantity
                                })
                            } 
                            }className={`${quantity  < 2 && `pointer-event-none`} focus:text-white  rounded cursor-pointer`}>+</button>
                    </div>

                    <p className='font-bold'>KSH {item.product.price}</p>
                </div>
                
            </div>
  )
}

export default CartItemCard