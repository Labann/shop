"use client"
import { useFormik } from 'formik'
import React, { useEffect, useRef } from 'react'
import * as yup from "yup"
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { createProduct, reset } from '../store/productSlice';
import { toast } from 'react-toastify';
import Spinner from './Spinner';
const AddProductModal = ({setIsAddProduct, shopId}:{
    shopId: string
    setIsAddProduct: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const { isError, message, isLoading} = useAppSelector(state => state.product);
    const dispatch = useAppDispatch();
    const fileRef = useRef<HTMLInputElement | null>(null);
    
    
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
                [
                    "image/jpeg",
                    "image/png",
                    "image/jpg",
                    "image/gif",
                    "image/webp",
                    "image/avif",
                    "image/svg+xml",
                    "image/bmp",
                    "image/tiff",
                    "image/x-icon", // for .ico files
                    "image/heic",
                    "image/heif"
                ].includes(file.type)
            );
            })
            .test("fileSize", "Each file must be less than 5MB", (files) => {
            if (!files || files.length === 0) return false;
            return files.every((file) => file.size <= 5 * 1024 * 1024); // 5MB
            })
            .test("maxFiles", "You can upload a maximum of 10 images", (files) => {
                if (!files || !Array.isArray(files)) return false;
                return files.length <= 10;
                }),
    })
    const initialValues = {
        name: "",
        description: "",
        price: 1,
        category: "Electronics",
        images: [] as File[],
        stock: 1
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

            
            const action = await dispatch(createProduct({product: formData, shopId}))
            if(action.type === "/product/create/fulfilled"){
                toast.success("created product successfully");
                setIsAddProduct(false);
            }
            if(action.type === "/product/create/rejected"){
                toast.error(message)
            }
            if (fileRef.current) {
                fileRef.current.value = ""; 
            }
            formik.resetForm();
        },
        validationSchema: schema
    })

    const categories = [
            {id: 0, category: "Electronics"},
            {id: 1, category: "Home Appliances"},
            {id: 2, category: "Personal Care"}
    ];
  return (
    <div className='fixed bg-black/90 z-100 justify-center px-4 py-7 items-center top-0 left-0 h-screen w-screen'>
        <IoClose 
            size={"1.5em"}
            className="absolute md:right-15 right-5 top-4 md:top-6 cursor-pointer md:text-3xl font-bold text-white"
            onClick={()=>setIsAddProduct(false)}
            />
        <form onSubmit={formik.handleSubmit} className='flex bg-white p-3 flex-col max-w-lg py-4 mx-auto space-y-3 rounded-md' action="">
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
                    <select 
                                title='category' 
                                name='category'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.category}
                                id="category"
                                className='w-full p-2 border-1 border-primary rounded-md'
                                >
                                {categories.map(category => (
                                    <option 
                                        key={category.id} 
                                        value={category.category}
                                        
                                        
                                    
                                        >{category.category}</option>
                                ))}
                        </select>
                    
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
                    <label htmlFor="images" className='text-primary font-semibold'>images</label>
                    <input 
                        type="file" 
                        accept='image/*'
                        multiple
                        placeholder='select images'
                        name='images'
                        ref={fileRef}
                        onChange={(e)=> {
                            if (!e.currentTarget.files) return; 
                            formik.setFieldValue(
                            "images",
                            Array.from(e.currentTarget.files)
                            )
                        }}
                        onBlur={formik.handleBlur}
                        
                        className='w-full p-2 border-1 border-primary rounded-md'
                        />
                    
                    {
                        formik.touched.images && formik.errors.images &&
                        (<h4 className='text-red-600 text-xs'>
                            {formik.errors.images && (
                                <>
                                    {typeof formik.errors.images === "string" && (
                                    <div className="">{formik.errors.images}</div>
                                    )}
                                    {Array.isArray(formik.errors.images) &&
                                    formik.errors.images.every(e => typeof e === "string") &&
                                    formik.errors.images.map((err, i) => (
                                        <div key={i} className="">{err}</div>
                                    ))}
                                </>
                                )}
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
                
                <button type='submit' className='w-full text-white p-3 text-center bg-primary'>
                    {isLoading ? <Spinner/>:  "submit"}
                </button>

                        
        </form>
    </div>
  )
}

export default AddProductModal