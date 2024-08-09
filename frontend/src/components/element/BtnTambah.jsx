import React from 'react'

const BtnTambah = ({onclick}) => {
  return (
    <button className='px-4 py-1 bg-[#435D33] text-white font-semibold rounded-md' onClick={onclick}>Tambah</button>
  )
}

export default BtnTambah