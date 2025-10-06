import SideBar from '@/app/components/SideBar'
import React from 'react'



const VendorsDashboardLayout = async ({children, params}:{
    children: React.ReactNode,
    params: Promise<{shopId: string}>
}) => {
  const shopId = (await params).shopId
  return (
    <div className="p-4 grid grid-cols-12 min-h-[45vh] md:p-8">
            <SideBar shopId={shopId}/>
            <main className="col-span-12 md:col-span-9 p-3">
                {children}
            </main>
    </div>
  )
}

export default VendorsDashboardLayout