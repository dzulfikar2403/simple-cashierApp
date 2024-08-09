import React from 'react'
import { HiOutlinePlus } from "react-icons/hi"
import { useNavigate } from 'react-router-dom'

const Card = ({data}) => {
  const navigate = useNavigate();

  return (
    <div className='relative w-44 h-44 cursor-pointer my-8' onClick={() => navigate(`/produk/${data._id}`)}>
      <img src={`/produkImg/${data.Thumbnail}`} alt="" className='w-full h-full rounded object-cover object-center' />
      <div className='absolute top-0 left-[50%] -translate-x-[50%] px-4 rounded-b-md bg-white '>
        <p className='text-xs text-center font-medium text-green-500'>{data.NamaProduk}</p>
      </div>
      <div className='absolute -bottom-5 left-[50%] -translate-x-[50%] rounded-2xl bg-slate-950 flex gap-2 w-4/5 justify-center items-center shadow-md px-4 py-2 '>
        <pre className='text-white rounded text-sm'>{data.Harga.toLocaleString("id-ID",{style: "currency",currency:"IDR"})}</pre>
        <button className='bg-green-500 text-white p-1 rounded-full'><HiOutlinePlus /></button>
      </div>
    </div>
  )
}

export default Card