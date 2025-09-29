"use client"
import React from 'react'
import Image from 'next/image'
import { CiSearch } from "react-icons/ci";
const Hero = () => {
  return (
    <div className="relative py-30 bg-[url('/hero.png')] bg-cover bg-center p-4">
      <div className="text-white max-w-lg mx-auto h-full flex flex-col space-y-3 justify-center items-center text-center">
        <h1 className='md:text-5xl text-3xl font-bold'>Welcome to SOKONI</h1>
        <p className='text-xl'>Connecting buyers and sellers, Shaping your Marketplace by Experience</p>
        <form className="pt-10 flex w-full">
            <div className="flex-1 relative text-slate-600 rounded-md overflow-hidden">
                <CiSearch
                    size={"1.5em"}
                    className='absolute left-0 top-3 cursor-pointer'
                />
                <input 
                    type="text"
                    name="" 
                    id=""
                    className='bg-white flex-1 text-xl border-0 focus:outline-none h-full p-2 pl-8 w-full'
                    placeholder='Search products'
                    />
            </div>
            
            <button className='text-white p-3 md:px-9 rounded-md cursor-pointer bg-primary'>Search</button>
        </form>
      </div>
      
    </div>
  )
}

export default Hero