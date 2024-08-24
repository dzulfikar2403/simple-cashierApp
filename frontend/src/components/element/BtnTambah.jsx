import React from 'react'

const BtnTambah = ({onclick,children,disabled}) => {
  return (
    <button disabled={disabled} className={`cursor-pointer px-4 py-1 bg-gradient-to-r from-[#435D33] via-green-500 to-green-300 text-white font-semibold rounded-md ${disabled && "opacity-50"}`} onClick={onclick}>{children}</button>
  )
}

export default BtnTambah