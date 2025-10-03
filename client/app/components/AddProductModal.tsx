"use client"
import { useFormik } from 'formik'
import React from 'react'
import * as yup from "yup"
import { IoClose } from "react-icons/io5";
const AddProductModal = ({setIsAddProduct}:{
    setIsAddProduct: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const schema = yup.object({
        name: yup.string().required(),
        description: yup.string().min(10).required(),
        category: yup.string().required(),
        stock: yup.number().required(),
        price: yup.number().required(),
        images: yup.mixed<File[]>()
            .required("Please upload at least one image")
            .test("fileType", "Unsupported file format", (files) => {
            if (!files || files.length === 0) return false;
            return files.every((file) =>
                ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
            );
            })
            .test("fileSize", "Each file must be less than 5MB", (files) => {
            if (!files || files.length === 0) return false;
            return files.every((file) => file.size <= 5 * 1024 * 1024); // 5MB
            }),
    })
    const initialValues = {
        name: "",
        description: "",
        price: 1,
        category: "",
        images: "",
        stock: 1
    }
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: () => console.log("submit"),
        validationSchema: schema
    })
  return (
    <div className='fixed bg-black/90 justify-center px-4 py-7 items-center top-0 left-0 h-screen w-screen'>
        <IoClose 
            size={"1.5em"}
            className="absolute md:right-15 right-5 top-4 md:top-6 cursor-pointer md:text-3xl font-bold text-white"
            onClick={()=>setIsAddProduct(false)}
            />
        <form onSubmit={formik.handleSubmit} className='flex bg-slate-300 p-3 flex-col max-w-lg py-4 mx-auto space-y-3 rounded-md' action="">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="name" className='text-primary font-semibold'>Product name</label>
                    <input 
                        type="text" 
                        placeholder='product name'
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
                    <label htmlFor="description" className='text-primary font-semibold'>Product Description (Tell us about your Product)</label>
                    <textarea 
                        placeholder='description'
                        name='description'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                        className='w-full p-2 border-1 border-primary rounded-md min-h-[10em]'
                        />
                    
                    {
                        formik.touched && formik.errors.description &&
                        (<h4 className='text-red-600 text-xs'>
                            {formik.errors.description}
                        </h4>)
                    }
                    
                </div>

                <div className="flex flex-col space-y-2">
                    <label htmlFor="name" className='text-primary font-semibold'>Product Category</label>
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
                    <label htmlFor="images" className='text-primary font-semibold'>images</label>
                    <input 
                        type="file" 
                        accept='image/*'
                        multiple
                        placeholder='select images'
                        name='images'

                        onChange={(e)=> {
                            if (!e.currentTarget.files) return; 
                            formik.setFieldValue(
                            "images",
                            e.currentTarget.files
                            )
                        }}
                        onBlur={formik.handleBlur}
                        
                        className='w-full p-2 border-1 border-primary rounded-md'
                        />
                    
                    {
                        formik.touched.images && formik.errors.images &&
                        (<h4 className='text-red-600 text-xs'>
                            {formik.errors.stock}
                        </h4>)
                    }
                    
                </div>
                
                <div className="flex flex-col space-y-2">
                    <label htmlFor="stock" className='text-primary font-semibold'>stock</label>
                    <input 
                        type="number" 
                        placeholder='stock'
                        name='stock'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.stock}
                        className='w-full p-2 border-1 border-primary rounded-md'
                        />
                    
                    {
                        formik.touched.stock && formik.errors.stock &&
                        (<h4 className='text-red-600 text-xs'>
                            {formik.errors.stock}
                        </h4>)
                    }
                    
                </div>
                
                <button type='submit' className='w-full text-white p-3 text-center bg-primary'>submit</button>

                        
        </form>
    </div>
  )
}

export default AddProductModal