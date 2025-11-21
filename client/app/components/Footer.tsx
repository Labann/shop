"use client"
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link"
const Footer  = () => {
    return (
        <div className="bg-primary py-3 text-white p-4">
            <div className="grid grid-cols-3 md:grid-cols-4 max-w-7xl mx-auto justify-items-center gap-7 py-10">
                <div className="flex flex-col space-y-3 col-span-3 md:col-span-1">
                    <div className="">
                        <Image
                            src={"/logo.png"}
                            width={100}
                            height={100}
                            alt="logo-img"
                        />
                        <span className="text-xs">Online marketplace</span>
                    </div>
                    
                    <p className="text-xl">Reach a wider audience and boost your sales with our user-friendly online store</p>
                </div>
                <div className="flex flex-col space-y-3 md:text-xl">
                    <h3 className="font-semibold">Account</h3>
                    <p>My Account</p>
                    <p>Login / Register</p>
                    <p>Cart</p>
                    <p>Wishlist</p>
                    <p>Shop</p> 
                </div>
                <div className="flex flex-col space-y-3 md:text-xl">
                    <h3 className="font-semibold">Quick Link</h3>
                    <p>Privacy Policy</p>
                    <p>Terms of User</p>
                    <p>FAQ</p>
                    <p>Contact</p>
                    
                </div>
                <div className="flex flex-col space-y-3 md:text-xl">
                    <h1>Contact Us</h1>
                    <div className="flex space-x-2 items-center">
                        <FaFacebookF />
                        <FaInstagram />
                    </div>
                    <p>0793712929</p>
                </div>
            </div>
            <div className="text-center border-t border-slate-100 py-4">
                <p>© 2025 <Link href="https://magotsi.vercel.app" className="hover:text-primary">Magotsi Laban</Link>. All Rights Reserved</p>
            </div>
        </div>
    )
}

export default Footer;