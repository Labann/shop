"use client"
import { useFormik } from 'formik'
import React, { useEffect, useRef } from 'react'
import * as yup from "yup"
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { createProduct, deleteProduct, editProduct, getSingleProduct, reset } from '../store/productSlice';
import { toast } from 'react-toastify';
import Spinner from './Spinner';
import Image from 'next/image';
const EditProductModal = ({setIsEditProduct, productId}:{
    
    setIsEditProduct: React.Dispatch<React.SetStateAction<boolean>>
    productId: string
}) => {
    const { isError, message, isLoading, currentProduct} = useAppSelector(state => state.product);
    const dispatch = useAppDispatch();
    
    
    const fileRef = useRef<HTMLInputElement | null>(null);
    useEffect(()=> {
        
        if(isError){
            toast.error(message)
            return
        }

        return () => {
            
            dispatch(reset());
        }
    }, [dispatch, isError, message])
    
    const schema = yup.object({
        name: yup.string().required(),
        description: yup.string().min(10).required(),
        category: yup.string().required(),
        stock: yup.number().required(),
        price: yup.number().required(),
        images: yup.mixed<File[]>()
            .required("Please upload at least one image")
            .test("fileType", "Unsupported file format", (files) => {
            if (!files || files.length === 0 || !Array.isArray(files)) return false;
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
        name: currentProduct?.name || "",
        description: currentProduct?.description || "",
        price: currentProduct?.price || 1,
        category: currentProduct?.category || "",
        images: currentProduct?.images || [] as File[],
        stock: currentProduct?.stock || 1
    }
    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: async (values) => {
            const formData = new FormData();

            values.images.forEach((file) => {
                formData.append("images", file);
            });
            
            

            formData.append("name", values.name)
            formData.append("description", values.description)
            formData.append("category", values.category)
            formData.append("stock", String(values.price))
            formData.append("price", String(values.price))

            
            const action = await dispatch(editProduct({product: formData, productId}))
            if(action.type === "/product/edit/fulfilled"){
                toast.success("edited product successfully");
                setIsEditProduct(false);
            }
            if (fileRef.current) {
                fileRef.current.value = ""; 
            }
            formik.resetForm();
        },
        validationSchema: schema
    })
      return (
        <div className='fixed bg-black/90  justify-center px-4 py-7 items-center top-0 left-0 h-screen overflow-y-scroll w-screen'>
            <IoClose 
                size={"1.5em"}
                className="absolute md:right-15 right-5 top-4 md:top-6 cursor-pointer md:text-3xl font-bold text-white"
                onClick={()=>setIsEditProduct(false)}
                />
            <div className="flex bg-white max-w-lg mx-auto p-1 rounded-t-2">
                <button onClick={async ()=> {
                const action = await dispatch(deleteProduct({productId}))
                console.log(action.payload)
                if(action.type === "/product/delete/fulfilled"){
                    toast.success("deleted successfully")
                    setIsEditProduct(false)
                }
                }} className=" bg-red-600 p-1 cursor-pointer rounded text-white text-center hover:bg-red-400 ">delete</button>
            </div>
            <form onSubmit={formik.handleSubmit} className='flex relative rounded-t-none bg-white p-3 flex-col max-w-lg py-1 mx-auto space-y-1 rounded-md' action="">
                    
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
                            className='w-full p-2 border-1 border-primary rounded-md min-h-[5em]'
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
                        <label htmlFor="stock" className='text-primary font-semibold'>price</label>
                        <input 
                            type="number" 
                            placeholder='price'
                            name='price'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.price}
                            className='w-full p-2 border-1 border-primary rounded-md'
                            />
                        
                        {
                            formik.touched.price && formik.errors.price &&
                            (<h4 className='text-red-600 text-xs'>
                                {formik.errors.price}
                            </h4>)
                        }
                        
                    </div>
                    <div className="flex flex-col space-y-2">
                    <label htmlFor="images" className='text-primary font-semibold'>Images</label>
                    
                    {/* Thumbnails of current images */}
                    <div className="flex gap-2 flex-wrap mb-2">
                        {formik.values.images?.length !== 0 && formik.values?.images?.map((img, i) => (
                        <div key={i} className="w-20 h-20 relative">
                            <Image
                                width={100}
                                height={100}
                                unoptimized
                                src={typeof img === "string" ? img : URL.createObjectURL(img)}
                                alt={`product-${i}`}
                                className="w-full h-full object-cover rounded-md"
                                />
                            <button
                            type="button"
                            className="absolute top-0 cursor-pointer right-0 text-white bg-red-600 rounded-full p-1"
                            onClick={() => {
                                 // Remove the clicked image
                                const newImages = formik.values.images.filter((_, idx) => idx !== i);
                                formik.setFieldValue("images", newImages);
                            }}
                            >
                            ✕
                            </button>
                        </div>
                        ))}
                    </div>

                    {/* File input */}
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        placeholder="select images"
                        name="images"
                        ref={fileRef}
                        onChange={(e) => {
                        if (!e.currentTarget.files) return;
                        formik.setFieldValue(
                            "images",
                            Array.from(e.currentTarget.files)
                        );
                        }}
                        onBlur={formik.handleBlur}
                        className="w-full p-2 border-1 border-primary rounded-md"
                    />

                    {/* Errors */}
                    {formik.touched.images && formik.errors.images && (
                        <h4 className="text-red-600 text-xs">
                        {typeof formik.errors.images === "string" && formik.errors.images}
                        {Array.isArray(formik.errors.images) &&
                            formik.errors.images.every((e) => typeof e === "string") &&
                            formik.errors.images.map((err, i) => <div key={i}>{err}</div>)}
                        </h4>
                    )}
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
                    
                    <button type='submit' className='w-full text-white p-3 text-center bg-primary'>
                        {isLoading ? <Spinner/>:  "submit"}
                    </button>
    
                            
            </form>
        </div>
  )
}

export default EditProductModal