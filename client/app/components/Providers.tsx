"use client"
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from '../store/store'
import { setUser } from '../store/authSlice'
import { useAppDispatch } from '../hooks/redux'
import { ToastContainer } from 'react-toastify'
import { setCart } from '../store/cartSlice'
const InitialState = () => {
  const dispatch = useAppDispatch();
  useEffect(()=> {
    const user = JSON.parse(localStorage.getItem("user") || "null")
    const cart = JSON.parse(localStorage.getItem("cart") || "null");
    console.log(cart)
    if(user){
      dispatch(setUser(user))
    }
    if(cart){
      dispatch(setCart(cart))
    }
  }, [dispatch])

  return null
}

const Providers = ({children}: {
    children: React.ReactNode
}) => {

  
  return (
    <Provider store={store}>
        <InitialState/>
        <ToastContainer />
        {children}
    </Provider>
  )
}

export default Providers