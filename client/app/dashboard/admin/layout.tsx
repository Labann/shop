import React from 'react'

const AdminRootLayout = ({children}: {
  children: React.ReactNode
}) => {
  return (
    <div>
      <h3 className='text-center font-bold text-3xl underline py-3'>Admin Panel</h3>
      {children}
    </div>
  )
}

export default AdminRootLayout