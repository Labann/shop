"use client"
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from '../store/store'
import { setUser } from '../store/authSlice'
import { useAppDispatch } from '../hooks/redux'
import { ToastContainer } from 'react-toastify'
const InitialState = () => {
  const dispatch = useAppDispatch();
  useEffect(()=> {
    const user = JSON.parse(localStorage.getItem("user") || "null")
    
    if(user){
      dispatch(setUser(user))
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