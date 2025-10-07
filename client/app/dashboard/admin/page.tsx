"use client"
import ApplicationCard from '@/app/components/ApplicationCard'
import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/hooks/redux'
import { getApplications } from '@/app/store/shopSlice'

const VendorsApplication = () => {
    
    const dispatch = useAppDispatch();
    const {currentUser} = useAppSelector(state => state.auth);
    const {applications} = useAppSelector(state => state.shop);
    useEffect(() => {
        if(currentUser?.role === "SUPER_ADMIN"){
          dispatch(getApplications())
        }
    }, [dispatch, currentUser])

    if(currentUser?.role !== "SUPER_ADMIN"){
      return <div className="text-center font-bold text-red-600 min-h-[45vh] text-3xl">Admins Only!</div>
    }
  return (

    <div className='max-w-7xl mx-auto min-h-[45vh] p-4'>
        <h3 className='font-semibold text-2xl'>Shop applications</h3>
        
        <div className="grid grid-cols-12 my-4  p-3 rounded border-2 border-slate-100/30 ">
            {
                applications.length === 0 && <p className='text-center font-bold text-primary col-span-12 text-3xl'>No applications found!</p>
            }
            {applications.length !== 0 && applications.map(
                shop => <ApplicationCard 
                            key={shop.id} 
                            shop={shop}
                            />
            )}
        </div>

        
    </div>
  )
}

export default VendorsApplication