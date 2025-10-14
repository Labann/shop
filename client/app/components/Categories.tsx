"use client"
import React from 'react'
import Link from 'next/link'
import CategoryCard from './CategoryCard'
const Categories = () => {
    const data = [
        {
            id: "0",
            category: "Home and Living",
            img: "/room.jpg"
        },
        {
            id: "1",
            category: "Fashion",
            img: "/fashion.png"
        },
        {
            id: "2",
            category: "Electronics",
            img: "/electronics.png"
        },
        {
            id: "3",
            category: "Beauty and Personal Care",
            img: "/beauty.jpeg"
        },
        {
            id: "4",
            category: "Kids, and Toys",
            img: "/toys.png"
        },
    ]
  return (
    <div className='max-w-7xl mx-auto p-4'>
        <div className="flex items-center justify-between">
            <h3 className='md:text-3xl text-2xl font-bold'>Explore our categories</h3>
            <Link href="/products" className=''>
                <span className='hidden md:block bg-primary text-white px-6 rounded p-2'>view all</span>
            </Link>
        </div>
        <div className="grid justify-items-center grid-cols-1 py-6 md:grid-cols-2 lg:grid-cols-3  gap-10">
            {data?.map(category => <CategoryCard 
                    key={category.id}
                    category={category.category}
                    img={category.img}
                />)}
        </div>
        
    </div>
  )
}

export default Categories