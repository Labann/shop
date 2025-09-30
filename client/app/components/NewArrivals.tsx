"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const NewArrivals = () => {
  return (
    <div className='max-w-7xl mx-auto md:grid grid-cols-2 gap-4 p-4 flex flex-col space-y-3'>
        <main className="md:col-span-2 h-[24em] rounded-md bg-primary grid md:grid-cols-3">
            <div className="bg-[url('/beach.png')] md:h-full bg-cover h-[20em]">
                
            </div>
            
            <div className="self-center text-white h-">
                <h3 className='text-4xl'>Beach Wears</h3>
                <p className='text-xl'>Featured beach wears that give you another vibe</p>
                <Link href={"/"} className='underline'>Shop now</Link>
            </div>
            <div className="bg-[url('/palm.jpeg')] bg-cover md:h-full h-[20em]"></div>
            
        </main>
        <div className="md:col-span-1 md:h-[24em] flex flex-col rounded-md bg-primary md:grid grid-cols-2">
            <div className="bg-[url('/speaker.png')] bg-cover md:h-full h-[20em]"/>
            <div className="text-white">
                <h3 className='font-bold text-4xl'>Speakers</h3>
                <p className='text-xl'>Amazing wireless speakers</p>
                <Link href={"/"} className='underline'>Shop now</Link>

            </div>
        </div>
        <div className="md:col-span-1 md:h-[24em] flex flex-col rounded-md bg-primary md:grid grid-cols-2">
            <div className="bg-[url('/appliance.png')] bg-cover md:h-full h-[20em]"/>
            <div className="text-white">
                <h3 className='font-bold'>Blow Dryer</h3>
                <p>Great blow dryer</p>
                <Link href={"/"} className='underline'>Shop now</Link>

            </div>
        </div>
    </div>
  )
}

export default NewArrivals