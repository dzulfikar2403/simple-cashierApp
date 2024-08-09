import React from 'react'
import { NavLink } from 'react-router-dom'

const DashboardLayout = ({children}) => {
  return (
    <div className='min-h-screen'>
      <div className='fixed top-0 bottom-0  w-[15%] h-full px-4 py-6 bg-black '>
          <h1 className='text-2xl text-white underline underline-offset-4'>APK</h1>
          <nav className='flex flex-col gap-5 py-12 text-slate-500'>
            <NavLink to={'/dashboard/home'}>Dashboard</NavLink>
            <NavLink to={'/dashboard/produk'}>Produk</NavLink>
            <NavLink to={'/dashboard/pelanggan'}>Pelanggan</NavLink>
            <NavLink to={'/dashboard/penjualan'}>Penjualan</NavLink>
            <NavLink to={'/dashboard/user'}>User</NavLink>
          </nav>
          <button className='px-2 py-1 text-red-500 border-2 border-red-500 rounded hover:bg-red-500 hover:text-white'>Logout</button>
      </div>
      <div className='ml-[15%] '>{children}</div>
    </div>
  )
}

export default DashboardLayout