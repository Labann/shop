"use client"
import React, { useEffect, useState } from 'react'
import Image from "next/image"
import { useParams } from 'next/navigation'
import AddProductModal from '@/app/components/AddProductModal'
import { RxDotFilled } from 'react-icons/rx'
import { useAppDispatch, useAppSelector } from '@/app/hooks/redux'
import { getShopProducts, getSingleProduct, reset } from '@/app/store/productSlice'
import EditProductModal from '@/app/components/EditProduct'


const Products = () => {
    const params = useParams();
    const shopId = Array.isArray(params.shopId) ? params.shopId[0] : params.shopId;
    const dispatch = useAppDispatch();
    const {shopProducts} = useAppSelector(state => state.product);
    useEffect(() => {
        if(shopId) {
            dispatch(getShopProducts({shopId}))
        }
        return () => {
            dispatch(reset())
        }
    }, [shopId, dispatch])
  
   const [isAddProduct, setIsAddProduct] = useState<boolean>(false);
   const [isEditProduct, setIsEditProduct] = useState<boolean>(false);
    const [productId, setProductId] = useState("");
   return (
    <div className="max-w-7xl mx-auto">
      {
            isAddProduct && shopId && (
                <AddProductModal setIsAddProduct={setIsAddProduct} shopId={shopId} />
            )
        }
    {
        isEditProduct && (
                <EditProductModal 
                    setIsEditProduct={setIsEditProduct} 
                    productId={productId} />
            )
    }
      <div className="rounded-t bg-gray-200 w-full overflow-x-scroll">
                <div className="flex justify-between p-3 items-center w-full rounded-t">
                    <h3 className="font-semibold text-xl">Product List</h3>
                    <button className="bg-primary cursor-pointer px-3 py-2 text-white rounded" onClick={()=> setIsAddProduct(true)}>Add new Product</button>
                </div>
                <table className="w-full">
                    <thead className=" bg-white ">
                        <tr className="">
                            <th className="text-primary text-left p-3">Product name</th>
                            <th className="text-left p-3">Price</th>
                            <th className="text-left p-3">QTY Available</th>
                            <th className="text-left p-3">Status</th>
                            <th className="text-left p-3">Sold</th>
                            <th className="text-left p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {shopProducts.length !== 0 && shopProducts.map( value => <tr key={value.id} className="border-b-2 border-slate-900/10 px-2">
                            <td className="flex  items-center space-x-2 p-3">
                                <Image
                                    src={value.images[0]}
                                    width={100}
                                    height={100}
                                    unoptimized
                                    className="w-[5em]"
                                    alt="product-img"
                                />
                                <p className="truncate w-[13em]">{value.description}</p>
                            </td>
                            <td className="font-semibold text-center">Ksh {value.price}</td>
                            <td className="text-center">{value.stock}pcs</td>
                            <td className="text-center">
                                {value.stock !== 0 ? <span className="flex items-center">
                                    <RxDotFilled className="text-green-400"/>
                                    <span className="">In Stock</span>
                                </span>: <span className="flex items-center">
                                    <RxDotFilled className="text-red-600"/>
                                    <span className="">Out of Stock</span>
                                </span>}
                            </td>
                            <td>20 pcs</td>
                            <td className="text-center"><button onClick={async () => {
                                await setProductId(value.id)
                                await dispatch(getSingleProduct({productId: value.id}))
                                await setIsEditProduct(!isEditProduct)
                                }} className='bg-primary rounded text-white cursor-pointer p-1 px-2'>Edit</button></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
    </div>
  )
}

export default Products