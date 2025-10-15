"use client"

import { useAppSelector } from '@/app/hooks/redux'
import React from 'react'

const SuccessCheckout = () => {
    const {currentPayment} = useAppSelector(state => state.payment);
  return (
    <div className='max-w-7xl mx-auto'>
        <h1 className='text-green-400'>Payment was successful!</h1>
        <p className=''>{currentPayment?.id}</p>
        <p>Amount: {currentPayment?.amount}</p>
        <p>{currentPayment?.updatedAt.getDate()} || {currentPayment?.updatedAt?.getTime()}</p>
    </div>
  )
}

export default SuccessCheckout