"use client"
import React from 'react'
import Image from 'next/image'
const DashboardNav = () => {
  return (
    <div className='flex items-center p-4 space-x-3'>
        <Image
            src={"/logo-t.png"}
            width={200}
            height={100}
            className='w-[7em]'
            alt="logo-img"
        />
        <span className='text-primary text-2xl border-l-2 pl-6 border-slate-100'>
            Seller Dashboard
        </span>
    </div>
  )
}

export default DashboardNav