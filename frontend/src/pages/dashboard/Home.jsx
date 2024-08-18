import React, { useEffect } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { getProducts } from '../../redux/reducer/produkSlice';
import { useDispatch, useSelector } from "react-redux"
import Card from "../../components/fragment/Card"
import loadingLoader from "../../assets/loading-loader.svg"

const Home = () => {
  const dispatch = useDispatch();
  const {produk,isLoading} = useSelector(state => state.produkSlice);
  const {userInfo} = useSelector(state => state.authSlice);

  useEffect(()=>{
    dispatch(getProducts())
  },[dispatch])

  return (
    <DashboardLayout>
      <div className='p-8'>
        <h1 className='text-4xl font-bold '>HI, {userInfo?.username}</h1>
        <hr className='border-2 border-[#928618] w-44 '/>
        <div className=' grid grid-cols-4 place-items-center w-full'>
          {isLoading && <img src={loadingLoader} alt="loading..." className="w-10 mx-auto animate-spin duration-500" />}
          {produk && produk.map((el,i) => <Card key={i} data={el}/>) }
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home