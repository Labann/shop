"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { approveShop } from '../store/shopSlice'
import { IShop } from '../types'
import Spinner from './Spinner'
import { toast } from 'react-toastify'

const ApplicationCard = ({shop}: {
    shop: IShop
}) => {
    
    const dispatch = useAppDispatch();
    
    const [isLoading, setIsLoading] = useState(false);
  return (
    <>
        <div className="col-span-4 p-2 mx-auto border-b-slate-300/30 border-b-2">
                {shop.logo && <Image 
                    src={shop.logo}
                    alt='shop-logo'
                    width={100}
                    unoptimized
                    height={100}
                    className='object-center h-20 rounded'
                />}
            </div>

            <div className="md:col-span-5 col-span-8 flex border-l-2 border-b-slate-300/30 border-b-2 border-l-slate-100/30 p-3 flex-col space-y-3">
                <p className='text-primary font-bold underline'>{shop.name}</p>
                <p className='t'>{shop.description}</p>
            </div>
            <div className="md:col-span-3 border-l-2 col-span-12 border-l-slate-300/30 p-3 border-b-slate-300/30 border-b-2">
                { <button onClick={async () => {
                    setIsLoading(true)
                    const action = await dispatch(approveShop({shopId: shop.id}))
                    if(action.type === "/shop/approve/fulfilled"){
                        toast.success("approved successfully")
                    }
                    setIsLoading(false)
                } }
                 className='rounded cursor-pointer hover:bg-green-300 w-full text-white p-1 self-center bg-green-400'>
                    {isLoading? <Spinner/>: "approve"}
                </button>}
            </div>
    </>
  )
}

export default ApplicationCard