"use client"
import React, { useState } from 'react'
import { FaBars } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import Image from "next/image"
import Link from 'next/link';
import { IoCloseSharp } from "react-icons/io5";
const Navbar = () => {
    const [isMenu, setIsMenu] = useState(false);    
    const [isLogin, setIsLogin] = useState(true);
  return (
    <div className='p-3 flex items-center relative justify-between text-primary max-w-7xl mx-auto'>
        {
            isMenu && (
                <div className='absolute top-26 left-0 z-50 md:hidden text-white bg-primary/30 flex flex-col space-y-2 p-2 py-3 font-bold rounded-r-md'>
                    <Link 
                        href={"/"} 
                        className='hover:text-black'
                        >
                        Home
                    </Link>
                    <Link 
                        href={"/shop/create-shop"}
                        className='hover:text-black'
                        >Create shop</Link>
                    <Link href={"/contact-us"} className='hover:text-black'>Contact us</Link>
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
            <Image
                src={"/logo-t.png"}
                width={200}
                height={100}
                className='w-[7em]'
                alt="logo-img"
            />
        </div>


        <div className="hidden md:flex items-center space-x-4 md:text-xl font-bold">
            <Link href={"/"}>Home</Link>
            <Link href={"/shop/create-shop"}>Create shop</Link>
            <Link href={"/contact-us"}>Contact us</Link>
        </div>


        {isLogin? <div className="flex items-center space-x-3">
            <Link href="/cart" className="relative cursor-pointer">
                <IoCartOutline 
                    size={"1.5em"}
                    className='font-bold'
                    />
                <span className='absolute -top-1 bg-primary text-white rounded-full font-bold -right-1 text-[.5em] w-4 h-4 flex justify-center items-center'>2</span>
            </Link>
            
            <Link href={"/wishlist"} className="relative cursor-pointer">
                <MdOutlineFavoriteBorder 
                    size={"1.5em"}
                    className='font-bold'
                    />
                <span className='absolute -top-1 bg-primary text-white rounded-full font-bold -right-1 text-[.5em] w-4 h-4 flex justify-center items-center'>2</span>
            </Link>
            
            <Link href={"/profile"}>
                <GoPerson 
                    size={"1.5em"}
                    className='font-bold'
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