"use client"
import React, { useEffect, useState } from 'react'
import { FaBars } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import Image from "next/image"
import Link from 'next/link';
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { reset as shopReset } from '../store/shopSlice';
import { logout, reset } from '../store/authSlice';
import Spinner from './Spinner';
import { toast } from 'react-toastify';
import { getMyShops } from '../store/shopSlice';
const Navbar = () => {
    const [isMenu, setIsMenu] = useState(false);
    const dispatch = useAppDispatch();    
    const {myShops} = useAppSelector(state => state.shop);
    const {cart} = useAppSelector(state => state.cart);
    const [isShowShops, setIsShowShops] = useState(false);
    const {currentUser, isLoading, isSuccess, isError, message} = useAppSelector(state => state.auth);
    const {wish} = useAppSelector(state => state.wish);
    useEffect(()=>{
        if(currentUser && currentUser.role == "VENDOR"){
            dispatch(getMyShops({userId: currentUser.id}))
            return
        }

        return () => {
            dispatch(reset());
            dispatch(shopReset())
        }

    }, [dispatch, isError, isSuccess, message, currentUser])
    const {myOrders} = useAppSelector(state => state.order);
    const ids = myOrders.flatMap(order => order.items.map(item => item.cartItemId));
    const filtered = cart?.items.filter(item => !ids.includes(item.id));

    return (
    <div className='p-3 flex items-center relative justify-between text-primary max-w-7xl mx-auto'>
        {
            isMenu && (
                <div className='absolute top-26 left-0 z-50 md:hidden text-white bg-primary/30 flex flex-col space-y-2 p-2 py-3 font-bold rounded-r-md'>
                    <Link 
                        href={"/"} 
                        className='hover:font-normal'
                        >
                        Home
                    </Link>
                    <Link 
                        href={"/shop/create-shop"}
                        className='hover:font-normal'
                        >Create shop</Link>
                    <Link href={"/contact-us"} className='hover:font-normal'>Contact us</Link>
                    <Link href={"/cart/checkout"} className='hover:font-normal'>order</Link>
                    
                    {
                        currentUser && currentUser.role === "VENDOR" &&  (
                            myShops.length !== 0  && <div className="flex flex-col relative">
                                <h5 className='flex space-x-2 items-center'>
                                    <span>shops - <span className='text-sm'>{myShops.length}</span></span>
                                    {
                                        isShowShops ? <FaChevronUp 
                                            className='text-sm cursor-pointer'
                                            onClick={()=> setIsShowShops(!isShowShops)}
                                            />: <FaChevronDown 
                                            className='text-sm cursor-pointer'
                                            onClick={()=> setIsShowShops(!isShowShops)}
                                            />
                                        }
                                </h5>
                                {isShowShops && <ul className='border-l border-white bg-primary/30 text-white min-w-20 p-2 text-sm space-y-3'>
                                    
                                        { myShops.map(shop => 
                                            <li key={shop.id}>
                                                <Link onClick={()=> setIsShowShops(!isShowShops)} href={`/dashboard/vendors/${shop.id}`} className='hover:font-extrabold text-center'>{shop.name}</Link>
                                            </li>
                                        )}
                                    
                                </ul>}
                            </div>
                            
                    )}

                    {
                        currentUser && currentUser.role === "SUPER_ADMIN" && (
                            <Link 
                                href={"/dashboard/admin"} 
                                className='cursor-pointer'>Admin</Link>
                        )
                    }
                    {
                        currentUser && <button 
                        onClick={async ()=> {
                            const action = await dispatch(logout())
                            if(action.type  === "/auth/logout/fulfilled"){
                                toast.success("logged out successfully")
                            }
                            if(action.type === "/auth/logout/rejected"){
                                toast.error(action.payload as string)
                            }
                        }}
                        className='bg-primary p-1 cursor-pointer rounded-md text-sm'>
                            {isLoading? <Spinner/>:  "Logout"}
                        </button>
                    }
                </div>
            )
        }

        <div className="flex items-center space-x-3">
            {
                isMenu?<IoCloseSharp  
                    onClick={()=> setIsMenu(!isMenu)}
                    size={"1.5em"} 
                    className='md:hidden cursor-pointer'
                />:  <FaBars 
                    onClick={()=> setIsMenu(!isMenu)}
                    size={"1.5em"} 
                    className='md:hidden cursor-pointer'
                    
                    /> }
            <Link href={"/"}>
                <Image
                    src={"/logo-t.png"}
                    width={200}
                    height={100}
                    className='w-[7em]'
                    alt="logo-img"
                />
            </Link>
            
        </div>


        <div className="hidden md:flex items-center space-x-4 md:text-xl font-bold">
            <Link href={"/"}>Home</Link>
            {currentUser && <Link href={"/cart/checkout"}>orders</Link>}
            {currentUser && currentUser.role !== "SUPER_ADMIN" && <Link href={"/shop/create-shop"}>Create shop</Link>}
            <Link href={"/contact-us"}>Contact us</Link>
            {currentUser && currentUser.role === "SUPER_ADMIN" && (
                <Link href={"/dashboard/admin"}>Admin</Link>
            ) }
            {currentUser && currentUser.role === "VENDOR" && (
                myShops.length !== 0  && <div className="flex z-50 flex-col relative">
                    <h5 className='flex space-x-2 items-center'>
                        <span>shops - <span className='text-sm'>{myShops.length}</span></span>
                        {
                            isShowShops? <FaChevronUp 
                                className='text-sm cursor-pointer'
                                onClick={()=> setIsShowShops(!isShowShops)}
                                />: <FaChevronDown 
                                className='text-sm cursor-pointer'
                                onClick={()=> setIsShowShops(!isShowShops)}
                                />
                            }
                    </h5>
                    {isShowShops && <ul className='border-l border-white bg-primary/30 text-white min-w-20 p-2 text-sm  flex flex-col space-y-3 absolute top-7 '>
                        
                           { myShops.map(shop => 
                                <li key={shop.id}>
                                    <Link onClick={()=> setIsShowShops(!isShowShops)} href={`/dashboard/vendors/${shop.id}`} className='hover:font-extrabold text-center'>{shop.name}</Link>
                                </li>
                            )}
                        
                    </ul>}
                </div>
                
            )}
        </div>

            
        {currentUser? <div className="flex items-center space-x-3">
            {cart && <Link href="/cart" className="relative cursor-pointer">
                <IoCartOutline 
                    size={"1.5em"}
                    className='font-bold'
                    />
                <span className='absolute -top-1 bg-primary text-white rounded-full font-bold -right-1 text-[.5em] w-4 h-4 flex justify-center items-center'>{filtered?.length}</span>
            </Link>}
            
            {currentUser && <Link href={"/wishlist"} className="relative cursor-pointer">
                <MdOutlineFavoriteBorder 
                    size={"1.5em"}
                    className='font-bold'
                    />
                <span className='absolute -top-1 bg-primary text-white rounded-full font-bold -right-1 text-[.5em] w-4 h-4 flex justify-center items-center'>
                    {wish ? `${wish.length}`: 0}                    
                </span>
            </Link>}
            
            <Link href={"/profile"}>
                <GoPerson 
                    size={"1.5em"}
                    className='font-bold hidden'
                />
            </Link>
            
        </div>: <div className="flex items-center space-x-3 text-primary">
            <Link href={"/auth/login"} className='focus:underline'>Sign in</Link>
            <Link href={"/auth/sign-up"} className='focus:underline'>Create Account</Link>
        </div>}
    </div>
  )
}

export default Navbar