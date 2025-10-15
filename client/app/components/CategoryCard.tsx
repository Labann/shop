"use client"
import React from 'react'
import Link from 'next/link'
const CategoryCard = ({category, img}:{
    category: string, img: string
}) => {
    if(!img) return;
  return (
    <Link 
      href={`/categories/${category}`}
        className={`relative  bg-cover h-[18em] w-[20em] rounded-md overflow-hidden`}
        style={{ backgroundImage: `url(${img})` }}
        >
        
        <p className="absolute bottom-0 p-2 text-white text-xl left-0 w-full rounded-t-md bg-black/80">
            {category}
        </p>
    </Link>
  )
}

export default CategoryCard