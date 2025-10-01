"use client"
import { useParams } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Featured from '@/app/components/Featured'
const Products = () => {
    const params = useParams<{ id: string }>()
    
  return ( 
    <div className='max-w-7xl mx-auto p-4'>
        <div className="flex text-sm items-center space-x-3">
            <Link href={"/"} className='text-slate-400'>Home</Link>
            
            <span className='text-primary'>/ Product name</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
            <div className="rounded-md bg-slate-400 ">
                
                    <Image 
                        alt="product-img"
                        width={800}
                        height={600}
                        src={"/shoe.png"}
                        quality={100}
                        className='object-contain w-full'
                        />
                
            </div>
            <div className="flex flex-col space-y-4 p-6">
                <h2 className='md:text-4xl text-3xl font-bold'>{"Product Name"}</h2>
                <p className='text-2xl'>KSH 3000</p>
                <div className="flex justify-between">
                    <p>Store Name:<span className='text-primary'> Sleek Fashion</span></p>
                    <p>Availability <span className='text-green-400'>In Stock</span></p>
                </div>

                <div className="border-1 border-slate-100/100 w-full my-2"></div>
                <p className='text-xl text-slate-400 w-full'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur illo sint assumenda ea quaerat animi eos doloremque adipisci, itaque numquam!</p>
                <div className="flex items-center space-x-3">
                    <h2 className='text-2xl'>Quantity</h2>
                    <div className="bg-primary text-white rounded flex items-center p-3 space-x-3"> 
                        <button className=' focus:text-white w-10 rounded text-xl cursor-pointer'>-</button>
                        <span className=' focus:text-white w-10 rounded text-xs'>01</span>
                        <button className=' focus:text-white w-10  rounded text-xl cursor-pointer'>+</button>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <h3 className='text-2xl'>Size: </h3>
                    <div className="flex items-center space-x-2">
                        <button className='border-primary border-1  focus:text-white w-10 p-2 rounded  focus:bg-primary'>S</button>
                        <button className='border-primary border-1  focus:text-white w-10 p-2 rounded focus:bg-primary'>M</button>
                        <button className='border-primary border-1  focus:text-white w-10 p-2 rounded focus:bg-primary'>L</button>
                        <button className='border-primary border-1  focus:text-white w-10 p-2 rounded focus:bg-primary'>XL</button>
                    </div>
                </div>

                <button className='p-3 cursor-pointer rounded text-center w-full bg-primary text-white'>Buy Now</button>

            </div>
        </div>

        <div className="flex items-center space-x-2 pb-10">
                    <div className="w-[7em] bg-slate-300 rounded">
                        <Image
                            alt='product-img'
                            width={100}
                            height={100}
                            src={"/shoe.png"}
                        />
                    </div>
                    <div className="w-[7em] bg-slate-300 rounded">
                        <Image
                            alt='product-img'
                            width={100}
                            height={100}
                            src={"/shoe.png"}
                        />
                    </div>
                    <div className="w-[7em] bg-slate-300 rounded">
                        <Image
                            alt='product-img'
                            width={100}
                            height={100}
                            src={"/shoe.png"}
                        />
                    </div>
                    <div className="w-[7em] bg-slate-300 rounded">
                        <Image
                            alt='product-img'
                            width={100}
                            height={100}
                            src={"/shoe.png"}
                        />
                    </div>
            </div>

        <Featured/>
    </div>
  )
}

export default Products