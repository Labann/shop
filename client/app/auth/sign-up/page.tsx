"use client"
import React, { useState } from 'react'
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";

import { useFormik } from 'formik';
import * as yup from "yup"
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { loginV2, signup } from '@/app/store/authSlice';
import Spinner from '@/app/components/Spinner';
import { createCart } from '@/app/store/cartSlice';


const SignUp = () => {
    const dispatch = useAppDispatch();
    
    const router = useRouter(); 
    const [isLoading, setIsLoading] = useState(false);
    const [isSeen, setIsSeen] = useState(false);
    const [isSeenConfirm, setIsSeenConfirm] = useState(false);
    
    const schema = yup.object({
        firstName: yup.string().min(2).required(),
        lastName: yup.string().min(2).required(),
        email: yup.string().email("invalid format").required(),
        password: yup.string().min(2).required(),
        username: yup.string().min(2).required(),
        confirm: yup.string()
            .oneOf([yup.ref("password")], "Password must match").required()

    })
    const {currentUser} = useAppSelector(state => state.auth);
    
    const formik = useFormik({
        initialValues: {email: "", password: "", firstName: "", lastName: "", confirm: "", username: ""},
        onSubmit: async (values) => {
            setIsLoading(true)
            const action = await dispatch(signup(values))
            setIsLoading(false)
            console.log(currentUser);
            if(action.type === "/auth/signup/fulfilled"){
                toast.success("user created successfully")
                if(currentUser) {
                    toast.success("create cart executed");
                    await dispatch(createCart())
                }
                router.push("/")
            }
        },
        validationSchema: schema
    })
  return (
    <>
            <div className='max-w-7xl mx-auto grid md:grid-cols-2 p-4 md:py-10 text-2xl'>
            <div className="w-lg bg-[url('/auth.png')] hidden lg:block bg-cover h-[50vh] self-center rounded-md">
                
            </div>
            <div className="max-w-xl mx-auto md:col-span-2 lg:col-span-1 flex flex-col w-full">
                <h1 className='font-bold md:text-3xl text-center md:text-left py-4'>Create your SOKONI Account</h1>
                <br />
                <form onSubmit={formik.handleSubmit} className='flex flex-col  space-y-3' action="">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="firstName" className='text-primary font-semibold'>first name</label>
                            <input 
                                type="text" 
                                placeholder='first name'
                                name='firstName'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstName}
                                className='w-full p-2 border-1 border-primary rounded-md'
                                />
                            {
                                formik.touched.firstName && formik.errors.firstName && (
                                    <h4 className='text-xs text-red-600'>{formik.errors.firstName}</h4>
                                )
                            }
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="last name" className='text-primary font-semibold'>last name</label>
                            <input 
                                type="text" 
                                placeholder='last name'
                                name='lastName'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastName}
                                className='w-full p-2 border-1 border-primary rounded-md'
                                />
                            {
                                formik.touched.lastName && formik.errors.lastName && (
                                    <h4 className='text-xs text-red-600'>{formik.errors.lastName}</h4>
                                )
                            }
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className='text-primary font-semibold'>email</label>
                        <input 
                            type="text" 
                            placeholder='Email'
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            className='w-full p-2 border-1 border-primary rounded-md'
                            />
                        {
                            formik.errors.email && formik.touched.email && (
                                <h4 className='text-xs text-red-600'>{formik.errors.email}</h4>
                            )
                        }
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="username" className='text-primary font-semibold'>username</label>
                        <input 
                            type="text" 
                            placeholder='Username'
                            name="username"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            onBlur={formik.handleBlur}
                            className='w-full p-2 border-1 border-primary rounded-md'
                            />
                        {
                            formik.errors.username && formik.touched.username && (
                                <h4 className='text-xs text-red-600'>{formik.errors.email}</h4>
                            )
                        }
                    </div>
                    <div className="flex flex-col relative space-y-2">
                        <label htmlFor="password" className='text-primary font-semibold'>password</label>
                        <input 
                            type={isSeen? "text": "password"} 
                            placeholder='Password'
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='w-full p-2 border-1 border-primary rounded-md'
                            />
                        {
                            formik.errors.password && formik.touched.password && (
                                <h4 className='text-red-600 text-xs'>{formik.errors.password}</h4>
                            )
                        }
                        {
                            isSeen? <GoEye 
                                className='right-2 top-13  absolute cursor-pointer'
                                onClick={()=> setIsSeen(!isSeen)}
                                />: <GoEyeClosed 
                                    className='right-2 top-13  absolute cursor-pointer'
                                     onClick={()=> setIsSeen(!isSeen)}
                                />
                        }
                    </div>

                    <div className="flex flex-col relative space-y-2">
                        <label htmlFor="confirm" className='text-primary font-semibold'>confirm password</label>
                        <input 
                            type={isSeenConfirm? "text": "password"} 
                            placeholder='Confirm password'
                            name='confirm'
                            value={formik.values.confirm}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='w-full p-2 border-1 border-primary rounded-md'
                            />
                        {
                            formik.errors.confirm && formik.touched.confirm && (
                                <h4 className='text-red-600 text-xs'>{formik.errors.confirm}</h4>
                            )
                        }
                        {
                            isSeenConfirm? <GoEye 
                                className='right-2 top-13  absolute cursor-pointer'
                                onClick={()=> setIsSeenConfirm(!isSeenConfirm)}
                                />: <GoEyeClosed 
                                    className='right-2 top-13  absolute cursor-pointer'
                                     onClick={()=> setIsSeenConfirm(!isSeenConfirm)}
                                />
                        }
                    </div>
    
                    <div className="flex items-center justify-between">
                        <input type="checkbox" placeholder='checkbox' className='cursor-pointer'/>
                        <span className='text-primary text-sm'>Forgot Password</span>
                    </div>
                    
                    <button className='w-full bg-gray-300 cursor-pointer rounded p-3 text-sm'>{isLoading? <Spinner/>: "Sign up"}</button>
    
                    
                </form>
                <div className="mx-auto flex flex-col space-y-3 w-full py-2">
                    <span className='text-center text-sm'>or</span>
                    
                    <button onClick={() => dispatch(loginV2())} className='w-full border-1 border-primary cursor-pointer p-2 flex items-center space-x-2 justify-center rounded'>
                        <FcGoogle /><span className='text-sm'>Sign in with Google</span>
                    </button>
    
                    
    
                    <span className='text-sm'>{"Already have an account? "} <Link href={"/auth/login"} className='font-bold text-primary'>Sign in</Link></span>
                </div>
            </div>
            
        </div>
        
        </>
  )
}

export default SignUp