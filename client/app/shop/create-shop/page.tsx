"use client"
import { useFormik } from 'formik'
import React from 'react'
import * as yup from "yup"
const CreateShop = () => {
  const schema = yup.object({
    name: yup.string().min(3).required(),
    description: yup.string().min(15).required(),
    category: yup.string().required(),
    location: yup.string().required(),
    logo: yup.mixed<File>().required("Please upload a logo")
        .test("fileType", "Unsupported file format", (value) => {
          const file = value as File | null;
          if (!file) return false;
          return ["image/jpeg", "image/png", "image/jpg"].includes(file.type);
        })
        .test("fileSize", "File too large (max 2MB)", (value) => {
          const file = value as File | null;
          if (!file) return true; // allow required() to handle empty
          return file.size <= 2 * 1024 * 1024;
        }),
  })
  const formik = useFormik({
    initialValues: {name: "", description: "", category: "", location: "", logo: null as File | null},
    onSubmit: () => console.log("submit"),
    validationSchema: schema
  })
  return (
    <>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 py-10'>
        <div className="w-lg bg-[url('/auth.png')] hidden lg:block bg-cover h-[50vh] self-center rounded-md">
            
        </div>

        <div className="max-w-lg mx-auto md:col-span-2 lg:col-span-1 flex flex-col w-full">
                    <h1 className='font-bold md:text-3xl text-center md:text-left py-4'>{"Let's create your seller account"}</h1>
                    <br />
                    <h4 className='text-sm'>Account information</h4>
                    <br />

                    <form onSubmit={formik.handleSubmit} className='flex flex-col  space-y-3' action="">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="name" className='text-primary font-semibold'>Store name</label>
                            <input 
                                type="text" 
                                placeholder='name'
                                name='name'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                className='w-full p-2 border-1 border-primary rounded-md'
                                />
                            
                            {
                                formik.touched.name && formik.errors.name &&
                                (<h4 className='text-red-600 text-xs'>
                                    {formik.errors.name}
                                </h4>)
                            }
                            
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="description" className='text-primary font-semibold'>Store Description (Tell us about your store)</label>
                            <textarea 
                                placeholder='description'
                                name='description'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                                className='w-full p-2 border-1 border-primary rounded-md min-h-[15em]'
                                />
                            
                            {
                                formik.touched && formik.errors.description &&
                                (<h4 className='text-red-600 text-xs'>
                                    {formik.errors.description}
                                </h4>)
                            }
                            
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="name" className='text-primary font-semibold'>Niche/ Business Category</label>
                            <input 
                                type="text" 
                                placeholder='category'
                                name='category'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.category}
                                className='w-full p-2 border-1 border-primary rounded-md'
                                />
                            
                            {
                                formik.touched.category && formik.errors.category &&
                                (<h4 className='text-red-600 text-xs'>
                                    {formik.errors.category}
                                </h4>)
                            }
                            
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="logo" className='text-primary font-semibold'>logo</label>
                            <input 
                                type="file" 
                                accept='image/*'
                                placeholder='logo'
                                name='logo'

                                onChange={(e)=> {
                                  if (!e.currentTarget.files) return; 
                                  formik.setFieldValue(
                                    "logo",
                                    e.currentTarget.files[0]
                                  )
                                }}
                                onBlur={formik.handleBlur}
                               
                                className='w-full p-2 border-1 border-primary rounded-md'
                                />
                            
                            {
                                formik.touched.logo && formik.errors.logo &&
                                (<h4 className='text-red-600 text-xs'>
                                    {formik.errors.logo}
                                </h4>)
                            }
                            
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="location" className='text-primary font-semibold'>location</label>
                            <input 
                                type="text" 
                                placeholder='location'
                                name='location'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.location}
                                className='w-full p-2 border-1 border-primary rounded-md'
                                />
                            
                            {
                                formik.touched.location && formik.errors.location &&
                                (<h4 className='text-red-600 text-xs'>
                                    {formik.errors.location}
                                </h4>)
                            }
                            
                        </div>
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" placeholder='checkbox' className='cursor-pointer'/>
                            <span className='text-primary text-sm'>By signing up, I agree with the terms and conditions</span>
                        </div>

                        
                    </form>
                </div>
      </div>
    </>
    
  )
}

export default CreateShop