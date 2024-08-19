import React from 'react'

const BtnTambah = ({onclick}) => {
  return (
    <button className='px-4 py-1 bg-gradient-to-r from-[#435D33] via-green-500 to-green-300 text-white font-semibold rounded-md' onClick={onclick}>Tambah</button>
  )
}

export default BtnTambah