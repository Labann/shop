"use client"
import React from 'react'

const CategoryCard = ({category, img}:{
    category: string, img: string
}) => {
    if(!img) return;
  return (
    <div 
        className={`relative  bg-cover h-[18em] w-[20em] rounded-md overflow-hidden`}
        style={{ backgroundImage: `url(${img})` }}

        >
        
        <p className="absolute bottom-0 p-2 text-white text-xl left-0 w-full rounded-t-md bg-black/80">
            {category}
        </p>
    </div>
  )
}

export default CategoryCard