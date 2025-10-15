"use client"
import { useAppSelector } from '@/app/hooks/redux'
import React from 'react'

const FailedPayment = () => {
  const {message} = useAppSelector(state => state.payment);
    return (
    <div className='max-w-7xl mx-auto'>
        <h3 className='font-bold text-primary'>Payment failed: <span className='text-red-600'>{message}</span></h3>
    </div>
  )
}

export default FailedPayment