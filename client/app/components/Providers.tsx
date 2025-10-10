"use client"
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from '../store/store'
import { setUser } from '../store/authSlice'
import { useAppDispatch } from '../hooks/redux'
import { ToastContainer } from 'react-toastify'
import { reset as authReset } from '../store/authSlice'  
import { getMyCart, reset, setCart } from '../store/cartSlice'
import { getMyOrders, setOrder } from '../store/orderSlice'
const InitialState = () => {
  const dispatch = useAppDispatch();
  useEffect(()=> {
    const user = JSON.parse(localStorage.getItem("user") || "null")
    const cart = JSON.parse(localStorage.getItem("cart") || "null");
    const order = JSON.parse(localStorage.getItem("order") || "null");

    if(user){
      dispatch(setUser(user))
      
    }
    if(order){
      setOrder(order);
    }
    if(!cart){
      dispatch(getMyCart())
    }
    if(cart){
      dispatch(setCart(cart))
    }
    
    return () => {
      dispatch(reset())
      dispatch(authReset());
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