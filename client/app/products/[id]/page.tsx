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
import ProductLoader from '@/app/components/ProductLoader'
const Products = () => {
    const {id}= useParams<{id: string}>()
    
    const dispatch = useAppDispatch();
    const {message } = useAppSelector(state => state.cart);
    const {currentProduct} = useAppSelector(state => state.product);
    //const productLoading = useAppSelector(state => state.product.isLoading);
    const [currentImage, setCurrentImage] = useState("");
    const {cart, isLoading} = useAppSelector(state => state.cart);
    const [quantity, setQuantity] = useState(1);
    const [productLoading, setProductLoading] = useState(false);
    const {currentUser} = useAppSelector(state => state.auth)
    const getProduct = async (id: string) => {
        setProductLoading(true);
        await dispatch(getSingleProduct({productId: id}));
        setProductLoading(false);
    }
    useEffect(() => {
        if(id){
            getProduct(id)
        }
        
    }, [dispatch, id])
    useEffect(()=>{
        if(cart  && currentProduct){
            const product = cart?.items?.find(p => p.id === currentProduct.id);
            if(!product) return
            setQuantity(product.quantity)
        }
    }, [quantity, currentProduct, cart])
    const [test, setTest] = useState(true);
    
   

    
    
  return ( 
    <div className='max-w-7xl mx-auto p-4'>
        <div className="flex text-sm items-center space-x-3">
            <Link href={"/"} className='text-slate-400'>Home</Link>
            
            <span className='text-primary'>/ {currentProduct?.name}</span>
        </div>
    {productLoading? (
    
    <div className='grid md:grid-cols-2 gap-3 max-w-7xl mx-auto p-4'>
        <div className="max-w-xl md:w-lg sm:w-xs w-xs mx-auto">
            <div className="md:h-[400px] h-[300px] bg-gray-300 animate-pulse w-full rounded-md"></div>
            <div className="flex items-center space-x-2 py-2">
                <div className="w-20 h-20 rounded-md bg-gray-300 animate-pulse"></div>
                <div className="w-20 h-20 rounded-md bg-gray-300 animate-pulse"></div>
                <div className="w-20 h-20 rounded-md bg-gray-300 animate-pulse"></div>
                
            </div>
        </div>
        <div className="md:flex flex-col md:w-lg hidden space-y-3 w-xs mx-auto">
            <div className="w-3/4 h-2 bg-gray-300 animate-pulse"></div>
            <div className="w-1/2 h-2 bg-gray-300 animate-pulse"></div>
            <div className="w-1/4 h-2 bg-gray-300 animate-pulse rounded"></div>
            <div className="w-3/4 h-2 bg-gray-300 animate-pulse"></div>
            <div className="w-1/2 h-2 bg-gray-300 animate-pulse"></div>
            <div className="w-1/4 h-2 bg-gray-300 animate-pulse rounded"></div>
            <div className="w-3/4 h-2 bg-gray-300 animate-pulse"></div>
            <div className="w-1/2 h-2 bg-gray-300 animate-pulse"></div>
            <div className="w-1/4 h-2 bg-gray-300 animate-pulse rounded"></div>
            <div className="w-3/4 h-2 bg-gray-300 animate-pulse"></div>
            <div className="w-1/2 h-2 bg-gray-300 animate-pulse"></div>
            <div className="w-1/4 h-2 bg-gray-300 animate-pulse rounded"></div>
            <div className="flex items-center space-x-2">
                <div className="w-20 h-5 animate-pulse bg-gray-300 rounded-md"></div>
                <div className="w-20 h-5 animate-pulse bg-gray-300 rounded-md"></div>
            </div>
        </div>
    </div>
    
   
   ) :
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
            <div className="rounded-md bg-slate-400 max-h-[55vh]">
                    {!isLoading && currentProduct?.images?.length !== 0 && currentProduct?.images[0] && <Image 
                        alt="product-img"
                        width={600}
                        height={600}
                        unoptimized
                        src={currentImage || currentProduct?.images[0]}
                        quality={100}
                        className='object-center rounded w-full h-full'
                        />}
                
            </div>
            <div className="flex flex-col space-y-4 md:p-6">
                <h2 className='md:text-4xl text-2xl font-bold'>{currentProduct?.name}</h2>
                <p className='text-xl'>KSH {currentProduct?.price}</p>
                <div className="flex justify-between">
                    <p>Store Name:<span className='text-primary mx-2 font-bold'>{currentProduct?.shop.name}</span></p>
                    <p>Availability <span className='text-green-400'>{currentProduct?.stock !== 0 && "In Stock"}</span></p>
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
                            
                        }
                        } className={`${quantity === 0 && `pointer-events-none`} hover:bg-primary/30 focus:text-white w-10 rounded text-xl cursor-pointer`}>-</button>
                        <span className='text-center focus:text-white w-10 rounded text-xs'>{quantity}</span>
                        <button onClick={async () => {
                                    setQuantity(quantity + 1)
                                }
                            }  
                        className={`focus:text-white w-10  rounded text-xl cursor-pointer hover:bg-primary/30`}>+</button>
                    </div>
                </div>
                <button onClick={
                    async () => {
                       if(cart && currentProduct) {
                        if(!currentUser || !cart) {
                            toast.error("You are required to log-in")
                            return
                        }
                        
                        const action = await dispatch(addToCart({cartId: cart.id, productId: currentProduct.id, quantity: quantity}))
                        if(action.type === "/cart/add/fulfilled"){
                            toast.success("product added to cart");
                            return
                        }else {
                            toast.error(action.payload as string);
                            return
                        }
                    }
                }
                } 
                className='md:p-3 p-2 hover:bg-primary/70 cursor-pointer rounded text-center w-full bg-primary text-white'>
                    {isLoading? <Spinner/>:  "Add to cart"}
                </button>

            </div>
        </div>}
        {
            productLoading && (
                ["1", "2", "3"].map(item => <div key={item} className='w-[7em] h-[7em] animate-pulse'/>)
            )
        }
        <div className="flex items-center flex-wrap space-x-2 pb-10">
                    {!productLoading && currentProduct?.images.map(img => <div onClick={()=> setCurrentImage(img)} key={img} className="w-[7em] cursor-pointer bg-gray-100 rounded">
                        <Image
                            alt='product-img'
                            unoptimized
                            width={100}
                            height={100}
                            src={img}
                            className='object-center w-[7em] h-[7em]'
                        />
                    </div>)}
                   
            </div>

        <Featured/>
    </div>
  )
}

export default Products