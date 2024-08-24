import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getProducts } from "../../redux/reducer/produkSlice";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/fragment/Card";
import loadingLoader from "../../assets/loading-loader.svg";
import Modal from "../../components/fragment/Modal";
import { addProdukToCart, decrement, increment, purchaseProduk, setCardsProduk, totalHarga } from "../../redux/reducer/penjualanSlice";
import { getPelangganData } from "../../redux/reducer/pelangganSlice";
import BtnTambah from "../../components/element/BtnTambah";

const Home = () => {
  const dispatch = useDispatch();
  const { produk, isLoading } = useSelector((state) => state.produkSlice);
  const { cart,total,isLoadingPurchase,isSuccess,isError } = useSelector((state) => state.penjualanSlice);
  const { pelanggan } = useSelector((state) => state.pelangganSlice);
  const { userInfo } = useSelector((state) => state.authSlice);
  const [togglePayment, setTogglePayment] = useState(false);
  const [memberId, setMemberId] = useState("");
  
  const addProduk = (e, data) => {
    e.stopPropagation();

    setTogglePayment((pre) => !pre);
    if (produk) {
      dispatch(addProdukToCart(data));
      dispatch(totalHarga());
    }
  };
  
  const incrementProduk = (id) => {
    dispatch(increment(id));
    dispatch(totalHarga());
  }

  const decrementProduk = (id) => {
    dispatch(decrement(id));
    dispatch(totalHarga());
  }

  const purchase = () => {
    const arrProdukId = cart.map(el => el._id);
    const arrProdukAmount = cart.map(el => el.amount);
    const dataProduk = {
      ProdukID: arrProdukId,
      MemberID: memberId,
      JumlahProduk: arrProdukAmount
    }
    console.log(dataProduk);
    
    dispatch(purchaseProduk(dataProduk));
  }

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getPelangganData());
  }, []);

  useEffect(() => {
    if (produk) {
      dispatch(setCardsProduk(produk));
    }
  }, [produk]);

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold ">HI, {userInfo?.username}</h1>
        <hr className="border-2 border-[#928618] w-44 " />
        <div className=" grid grid-cols-4 place-items-center w-full">
          {isLoading && <img src={loadingLoader} alt="loading..." className="w-10 mx-auto animate-spin duration-500" />}
          {produk && produk.map((el, i) => <Card key={i} data={el} onclick={(e) => addProduk(e, el)} />)}
        </div>
      </div>
      {togglePayment && (
        <Modal onclickModal={() => setTogglePayment((pre) => !pre)}>
          <div className="w-full bg-slate-100 p-1 rounded flex flex-col gap-4">
            <div className="hideScroll max-h-72 bg-slate-300 overflow-y-scroll rounded p-2 flex flex-col gap-4">
              {cart &&
                cart.length > 0 &&
                cart.map((el, i) => (
                  <div key={i} className={`text-sm flex gap-2 justify-between items-center p-2 bg-slate-50 rounded`}>
                    <div className="basis-[10%]">
                      <img src={`/produkImg/${el.Thumbnail}`} alt="imgSource" className="h-16 border-2 border-slate-200 rounded object-cover object-center" />
                    </div>
                    <p className="basis-1/2 font-medium text-slate-700">{el.NamaProduk}</p>
                    <div className="flex items-center gap-2">
                      <button onClick={() => decrementProduk(el._id)}>-</button>
                      <span>{el.amount}</span>
                      <button onClick={() => incrementProduk(el._id)}>+</button>
                    </div>
                    <pre className="basis-[35%] text-end text-slate-700 font-semibold">{(el.Harga * el.amount).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</pre>
                  </div>
                ))}
            </div>
            <hr />
            <div className="flex items-end flex-col px-2">
              <label htmlFor="MemberID" className="text-xs">Member (optional)</label>
              <select name="MemberID" id="MemberID" className="w-36 mb-2" onChange={(e) => setMemberId(e.target.value)}>
                <option value="">Choose Member</option>
                {pelanggan && pelanggan.map((mbr,i) => <option key={i} value={mbr._id}>{mbr.NamaPelanggan}</option>)}
              </select>
              <p className="text-xl font-mono font-medium py-1">Total Harga: {total.toLocaleString("id-ID",{style: "currency",currency: "IDR"})}</p>
              <div className="py-1">
              <BtnTambah disabled={isLoadingPurchase} onclick={purchase} >Purchase</ BtnTambah>
              {isSuccess && <p className="text-teal-400 text-center">{isSuccess}</p>}
              {isError && <p className="text-rose-400 text-center">{isError}</p>}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
};

export default Home;
