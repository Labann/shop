import React from 'react'
import Link from 'next/link'
const AdminRootLayout = ({children}: {
  children: React.ReactNode
}) => {
  return (
    
    <div>
      <h3 className='text-center font-bold text-3xl underline py-3 max-w-7xl mx-auto'>Admin Panel</h3>
      <div className="max-w-7xl mx-auto text-primary flex justify-center space-x-3 text-3xl py-5">
        <Link href={"/dashboard/admin"} className='hover:underline focus:underline capitalize'>applications</Link>
        <Link href={"/dashboard/admin/products"} className='hover:underline focus:underline capitalize'>products</Link>
      </div>
      <div className="min-h-[45vh]">
        {children}
      </div>
      
    </div>
  )
}

export default AdminRootLayout