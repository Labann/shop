"use client"
import Image from "next/image"
const Features = () => {
    const data  = [
        {
            id: 0,
            img: "/settings.png",
            title: "Easy setup",
            feature: "Seamlessly launch your online store with our intuitive and user friendly set up"
        },
        {
            id: 1,
            img: "/payment.png",
            title: "Secure payment processing",
            feature: "Accept payment with confidence using our secure payment gateway, ensuring safety"
        },
        {
            id: 2,
            img: "/inventory.png",
            title: "Inventory Management",
            feature: "Effortless manage your products, track inventory levels and keep track of product availability"
        },
        {
            id: 3,
            img: "/optimization.png",
            title: "Search engine optimization",
            feature: "Improve your store visibility in search engine results"
        },
        {
            id: 4,
            img: "/graph.png",
            title: "Sell without goods",
            feature: "You can sell without owning goods as we have wide range of products from our suppliers to pick and sell from"
        }
    ]
    return (
        <div className="max-w-7xl p-4 mx-auto">
            <h3 className='md:text-3xl text-2xl font-bold col-span-2 sm:col-span-3 md:col-span-4'>Our unique features</h3>            
            <div className="grid grid-cols-2 sm:grid-cols-3 py-4 md:grid-cols-4 gap-3 justify-items-center">
                
                {data.map(value  => <div key={value.id} className="flex flex-col justify-center items-center">
                    {value.img && <Image
                        src={value.img}
                        alt="icon-png"
                        width={100}
                        height={100}
                        className="w-[5em] rounded"
                    />}
                    <div className="text-center">
                        <h4 className="font-bold">{value.title}</h4>
                        <p className="text-xs">{value.feature}</p>
                    </div>
                </div>   )}

            </div>
        </div>
        
    )
}

export default Features