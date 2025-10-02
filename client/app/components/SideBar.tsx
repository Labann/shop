"use client"
import React from 'react'
import { MdDashboard } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";
import { SiSimpleanalytics } from "react-icons/si";
import { MdSupportAgent } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { GrCube } from "react-icons/gr";
import Link from "next/link";
const SideBar = () => {
  return (
    <div className="md:flex flex-col hidden col-span-3">
                <div className="p-2 flex flex-col space-y-6 border-b-2 border-slate-100/30 pb-10">
                    <Link href={"/dashboard"}  className="flex item-center p-2  text-primary focus:bg-primary focus:text-white space-x-2 rounded-xl">
                        <MdDashboard size={"1.5em"}/>
                        <span>Dashboard</span>
                    </Link>
                    
                    <Link href={"/dashboard/products"} className="flex item-center p-2  text-primary focus:bg-primary focus:text-white space-x-2 rounded-xl">
                        <GrCube size={"1.5em"}/>
                        <span>Products</span>
                    </Link>
                    
                    <Link href={"/dashboard/orders"} className="flex item-center p-2  text-primary focus:bg-primary focus:text-white space-x-2 rounded-xl">
                        <BsCart2 size={"1.5em"}/>
                        <span>Orders</span>
                    </Link>
                    
                    <Link href={"/dashboard/analytics"} className="flex item-center p-2  text-primary focus:bg-primary focus:text-white space-x-2 rounded-xl">
                        <SiSimpleanalytics size={"1.5em"}/>
                        <span className="">Analytics</span>
                    </Link>
                    
                    <Link href={"/dashboard/help"} className="flex item-center p-2  text-primary focus:bg-primary focus:text-white space-x-2 rounded-xl">
                        <MdSupportAgent size={"1.5em"}/>
                        <span className="text-sm">Help and support</span>
                    </Link>
                    
                </div>
                <div className="flex flex-col space-y-3 py-6 justify-center">
                    <Link href={"/dashboard/profile"} className="flex item-center p-2  text-primary focus:bg-primary focus:text-white space-x-2 rounded-xl">
                            <IoPersonOutline size={"1.5em"}/>
                            <span>Profile</span>
                    </Link>
                    
                    
                    
                </div>
            </div>
  )
}

export default SideBar