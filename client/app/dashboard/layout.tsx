import React from 'react'
import SideBar from '../components/SideBar'

const DashboardLayout = ({children}:{
    children: React.ReactNode
}) => {
  return (
    <div className="p-4 grid grid-cols-12 min-h-[45vh] md:p-8">
            <SideBar/>
            <main className="col-span-12 md:col-span-9 p-3">
                {children}
            </main>
    </div>
  )
}

export default DashboardLayout