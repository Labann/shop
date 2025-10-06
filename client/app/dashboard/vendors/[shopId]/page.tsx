"use client"

import { FiDatabase } from "react-icons/fi";
import Image from "next/image";
import { BsGraphUpArrow  } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { useEffect, useState } from "react";
import AddProductModal from "../../../components/AddProductModal";
import { useAppSelector } from "@/app/hooks/redux";
import { useParams, useRouter } from "next/navigation";
const DashboardVendors = () => {
    const {currentUser} = useAppSelector(state => state.auth);
    const router = useRouter()
    useEffect(()=> {
        if(!currentUser || currentUser.role !== "VENDOR"){
            router.push("/");
            return;
        }
    }, [currentUser, router])

    
    

    const params = useParams();
    const shopId = Array.isArray(params.shopId) ? params.shopId[0] : params.shopId;
   
    return (
        <div className="relative">
            
            <div className="grid grid-cols-3 gap-3">
                <div className="rounded-md p-3 bg-primary cursor-pointer flex flex-col space-y-5">
                    <div className="flex items-center justify-between">
                        <p className="text-white">Avg. Order Value</p>
                        <FiDatabase className="bg-white p-1 rounded" size={"1.5em"}/>
                    </div>
                    <div className="text-white text-3xl">KSH 3000</div>
                    <span className="text-xs flex space-x-2  ">
                        <BsGraphUpArrow className="text-green-400" size={""}/>
                        <p>0.02% From April</p>
                    </span>
                </div>

                <div className="rounded-md p-3 bg-gray-200 text-black cursor-pointer flex flex-col space-y-5">
                    <div className="flex items-center justify-between">
                        <p>Total sales</p>
                        <FiDatabase className="bg-black/70 text-white rounded p-1" size={"1.5em"}/>
                    </div>
                    <div className="text-3xl">KSH 300</div>
                    <span className="text-xs flex items-center space-x-2">
                        <BsGraphUpArrow className="text-green-400" />
                        <p>0.02% From April</p>
                    </span>
                </div>

                <div className="rounded-md p-3 bg-gray-200 text-black cursor-pointer flex flex-col space-y-5">
                    <div className="flex items-center justify-between">
                        <p>Total Revenue</p>
                        <FiDatabase className="bg-black/70 text-white rounded p-1" size={"1.5em"}/>
                    </div>
                    <div className="text-3xl">KSH 30</div>
                    <span className="text-xs flex space-x-2 items-center">
                        <BsGraphUpArrow className="text-green-400" />
                        <p>0.02% From April</p>
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 py-4">
                <div className="rounded-md h-[20em] bg-gray-200"></div>
                <div className="rounded-md h-[20em] bg-gray-200"></div>
            </div>

        </div>
    )
}

export default DashboardVendors;