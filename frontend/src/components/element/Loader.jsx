import React from 'react'
import loadingLoader from "../../assets/loading-loader.svg";

const Loader = () => {
  return (
    <div className='w-full'>
    <img src={loadingLoader} alt="loading..." className="w-10 min-h-screen mx-auto animate-spin duration-500" />
    </div>
  )
}

export default Loader