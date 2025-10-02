"use client"

import { FiDatabase } from "react-icons/fi";
import Image from "next/image";
import { BsGraphUpArrow  } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
const Dashboard = () => {

    const data = [
        {
            id: 0
        },
        {
            id: 1
        },
        {
            id: 3
        },
        {
            id: 4
        },
        {
            id: 5
        }
    ]
    return (
        <div className="">
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

            <div className="rounded-t bg-gray-200 w-full overflow-x-scroll">
                <div className="flex justify-between p-3 items-center w-full rounded-t">
                    <h3 className="font-semibold text-xl">Product List</h3>
                    <button className="bg-primary cursor-pointer px-3 py-2 text-white rounded">Add new Product</button>
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
                        {data.map( value => <tr key={value.id} className="border-b-2 border-slate-900/10 px-2">
                            <td className="flex  items-center space-x-2 p-3">
                                <Image
                                    src={"/shoe.png"}
                                    width={100}
                                    height={100}
                                    className="w-[5em]"
                                    alt="product-img"
                                />
                                <p className="truncate w-[13em]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut quasi itaque, inventore laboriosam eum explicabo quo enim dignissimos aliquam maxime perferendis molestiae hic saepe! Quidem odit praesentium quia expedita laudantium!</p>
                            </td>
                            <td className="font-semibold text-center">Ksh 300</td>
                            <td className="text-center">53pcs</td>
                            <td className="text-center">
                                <span className="flex items-center">
                                    <RxDotFilled className="text-green-400"/>
                                    <span className="">In Stock</span>
                                </span>
                            </td>
                            <td>20 pcs</td>
                            <td className="text-center">...</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}

export default Dashboard;