"use client"
import { useParams } from 'next/navigation'
import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Featured from '@/app/components/Featured'
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux'
import { getSingleProduct } from '@/app/store/productSlice'
import { addToCart } from '@/app/store/cartSlice'
import { toast } from 'react-toastify'
import Spinner from '@/app/components/Spinner'
const Products = () => {
    const {id}= useParams<{id: string}>()
    
    const dispatch = useAppDispatch();
    const {message } = useAppSelector(state => state.cart);
    const {currentProduct} = useAppSelector(state => state.product);
    const [currentImage, setCurrentImage] = useState("");
    const {cart, isLoading} = useAppSelector(state => state.cart);
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        if(id){
            dispatch(getSingleProduct({productId: id}));
        }
        
    }, [dispatch, id])
    useEffect(()=>{
        if(cart  && currentProduct){
            const product = cart?.items?.find(p => p.id === currentProduct.id);
            if(!product) return
            setQuantity(product.quantity)
        }
    }, [quantity, currentProduct, cart])
    
   if(!currentProduct || !cart) return <div className='animate-pulse min-h-[45vh]'></div>

    
    
  return ( 
    <div className='max-w-7xl mx-auto p-4'>
        <div className="flex text-sm items-center space-x-3">
            <Link href={"/"} className='text-slate-400'>Home</Link>
            
            <span className='text-primary'>/ {currentProduct?.name}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
            <div className="rounded-md bg-slate-400 max-h-[55vh]">
                
                    {currentProduct.images.length !== 0 && currentProduct.images[0] && <Image 
                        alt="product-img"
                        width={600}
                        height={600}
                        unoptimized
                        src={currentImage || currentProduct.images[0]}
                        quality={100}
                        className='object-center rounded w-full h-full'
                        />}
                
            </div>
            <div className="flex flex-col space-y-4 md:p-6">
                <h2 className='md:text-4xl text-2xl font-bold'>{currentProduct?.name}</h2>
                <p className='text-xl'>KSH {currentProduct.price}</p>
                <div className="flex justify-between">
                    <p>Store Name:<span className='text-primary mx-2 font-bold'>{currentProduct.shop.name}</span></p>
                    <p>Availability <span className='text-green-400'>{currentProduct.stock !== 0 && "In Stock"}</span></p>
                </div>

                <div className="border-1 border-slate-100/100 w-full my-2"></div>
                <div className="max-h-[20vh] overflow-y-scroll">
                        <p className='text-xl text-slate-400 w-full'>{currentProduct?.description}</p>
                </div>
                
                <div className="flex items-center space-x-3">
                    <h2 className='text-xl'>Quantity</h2>
                    <div className="bg-primary text-white rounded flex items-center md:p-3 p-1 space-x-3"> 
                        <button onClick={async () => {
                            if(quantity > 1){
                                await setQuantity(quantity - 1)
                            }
                            console.log(quantity);
                           
                        }
                        } className={`${quantity === 0 && `pointer-events-none`} focus:text-white w-10 rounded text-xl cursor-pointer`}>-</button>
                        <span className='text-center focus:text-white w-10 rounded text-xs'>{quantity}</span>
                        <button onClick={async () => {
                                    setQuantity(quantity + 1);
                                    console.log(quantity);
                                }
                            }  
                        className={`focus:text-white w-10  rounded text-xl cursor-pointer`}>+</button>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <h3 className='text-2xl'>Size: </h3>
                    <div className="flex items-center space-x-2">
                        <button className='border-primary border-1  focus:text-white w-10 p-2 rounded  focus:bg-primary'>S</button>
                        <button className='border-primary border-1  focus:text-white w-10 p-2 rounded focus:bg-primary'>M</button>
                        <button className='border-primary border-1  focus:text-white w-10 p-2 rounded focus:bg-primary'>L</button>
                        <button className='border-primary border-1  focus:text-white w-10 p-2 rounded focus:bg-primary'>XL</button>
                    </div>
                </div>

                <button onClick={
                    async () => {
                    
                        const action = await dispatch(addToCart({cartId: cart.id, productId: currentProduct.id, quantity: quantity}))
                        if(action.type === "/cart/add/fulfilled"){
                            toast.success("product added to cart");
                        }else {
                            toast.error(action.payload as string);
                        }
                }
                } 
                className='md:p-3 p-2 hover:bg-primary/70 cursor-pointer rounded text-center w-full bg-primary text-white'>
                    {isLoading? <Spinner/>:  "Add to cart"}
                </button>

            </div>
        </div>

        <div className="flex items-center space-x-2 pb-10">
                    {currentProduct?.images.map(img => <div onClick={()=> setCurrentImage(img)} key={img} className="w-[7em] cursor-pointer bg-slate-300 rounded">
                        <Image
                            alt='product-img'
                            unoptimized
                            width={100}
                            height={100}
                            src={img}
                            className='object-center w-full h-full'
                        />
                    </div>)}
                   
            </div>

        <Featured/>
    </div>
  )
}

export default Products