"use client"
import React, { useEffect, useState } from 'react'
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";
import Image from 'next/image'
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";

import { useFormik } from 'formik';
import * as yup from "yup"
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux';
import { login, reset } from '@/app/store/authSlice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
const Login = () => {
    const dispatch = useAppDispatch();
    const {isSuccess, isError, message} = useAppSelector(state => state.auth);
    const [isSeen, setIsSeen] = useState(false);
    const router = useRouter(); 
    useEffect(()=>{
        if(isError){
            toast.error(message)
            return
        }
        if(isSuccess){
            router.push("/")
            return
        }

        return () => {
            dispatch(reset())
        }
    }, [isSuccess, isError,  dispatch, message, router])
    const schema = yup.object({
        email: yup.string().email("Invalid format").required(),
        password: yup.string().min(3).max(20).required()
    });

    const formik = useFormik({
        initialValues: {email: "", password: ""},
        onSubmit: async (values) => await dispatch(login(values)),
        validationSchema: schema,
    })
  return (
    <>
        <div className='max-w-7xl mx-auto grid md:grid-cols-2 p-4 md:py-10 text-2xl'>
        <div className="w-lg bg-[url('/auth.png')] hidden lg:block bg-cover h-[50vh] self-center rounded-md">
            
        </div>
        <div className="max-w-lg mx-auto md:col-span-2 lg:col-span-1 flex flex-col w-full">
            <h1 className='font-bold md:text-3xl text-center md:text-left py-4'>Sign in to your SOKONI Account</h1>
            <br />
            <form onSubmit={formik.handleSubmit} className='flex flex-col  space-y-3' action="">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className='text-primary font-semibold'>email</label>
                    <input 
                        type="text" 
                        placeholder='Email'
                        name='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className='w-full p-2 border-1 border-primary rounded-md'
                        />
                    
                    {
                        formik.touched.email && formik.errors.email &&
                        (<h4 className='text-red-600 text-xs'>
                            {formik.errors.email}
                        </h4>)
                    }
                    
                </div>
                <div className="flex flex-col relative space-y-2">
                    <label htmlFor="password" className='text-primary font-semibold'>password</label>
                    <input 
                        type={isSeen? "text": "password"} 
                        placeholder='Password'
                        name='password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        className='w-full p-2 border-1 border-primary rounded-md'
                        />
                    {
                        isSeen? (<GoEye 
                            className='right-2 top-13  absolute cursor-pointer'
                            onClick={()=> setIsSeen(!isSeen)}
                            />): (<GoEyeClosed 
                                className='right-2 top-13  absolute cursor-pointer'
                                 onClick={()=> setIsSeen(!isSeen)}
                            />)
                    }
                    {
                        formik.touched.password && formik.errors.password && (
                            <h4 className='text-red-600 text-xs'>{formik.errors.password}</h4>
                        )
                    }
                </div>

                <div className="flex items-center justify-between">
                    <input type="checkbox" placeholder='checkbox' className='cursor-pointer'/>
                    <span className='text-primary text-sm'>Forgot Password</span>
                </div>
                <button className='w-full bg-gray-300 p-3 cursor-pointer rounded text-sm'>Sign in</button>

                <span className='text-center text-sm'>or</span>
                
                <button type='submit' className='w-full border-1 border-primary cursor-pointer p-2 flex items-center space-x-2 justify-center rounded'>
                    <FcGoogle /><span className='text-sm'>Sign in with Google</span>
                </button>

                <br />

                <span className='text-sm'>{"Don't have an account? "} <Link href={"/auth/sign-up"} className='font-bold text-primary'>Join us</Link></span>
            </form>
        </div>
        
    </div>
    
    </>
    
  )
}

export default Login