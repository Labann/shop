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
  return (
    <div className='p-3 flex items-center relative justify-between text-primary max-w-7xl mx-auto'>
        {
            isMenu && (
                <div className='absolute top-20 left-0 md:hidden text-white bg-primary/30 flex flex-col space-y-2 p-2 font-bold rounded-r-md'>
                    <Link 
                        href={"/"} 
                        className='hover:text-black'
                        >
                        Home
                    </Link>
                    <Link 
                        href={"/about-us"}
                        className='hover:text-black'
                        >About us</Link>
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
            <Link href={"/about-us"}>About us</Link>
            <Link href={"/contact-us"}>Contact us</Link>
        </div>


        <div className="flex items-center space-x-3">
            <div className="relative cursor-pointer">
                <IoCartOutline 
                    size={"1.5em"}
                    className='font-bold'
                    />
                <span className='absolute -top-1 bg-primary text-white rounded-full font-bold -right-1 text-[.5em] w-4 h-4 flex justify-center items-center'>2</span>
            </div>
            
            <div className="relative cursor-pointer">
                <MdOutlineFavoriteBorder 
                    size={"1.5em"}
                    className='font-bold'
                    />
                <span className='absolute -top-1 bg-primary text-white rounded-full font-bold -right-1 text-[.5em] w-4 h-4 flex justify-center items-center'>2</span>
            </div>
            
            <Link href={"/profile"}>
                <GoPerson 
                    size={"1.5em"}
                    className='font-bold'
                />
            </Link>
            
        </div>
    </div>
  )
}

export default Navbar