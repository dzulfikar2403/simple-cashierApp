import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductsById } from "../redux/reducer/produkSlice";
import Loader from "../components/element/Loader";

const ProdukDetail = () => {
  const dispatch = useDispatch();
  const { produkSingle,isLoading } = useSelector((state) => state.produkSlice);
  const { id } = useParams();
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    dispatch(getProductsById(id));
  }, []);

  useEffect(() => {
    if (produkSingle) {
      setThumbnail(produkSingle.Thumbnail);
    }
  }, [produkSingle]);

  return (
    <>
      {isLoading && <Loader />}
      {produkSingle && (
        <div className="bg-black w-3/5 min-h-screen ms-auto">
          <div className="absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center">
            <Link to={"/dashboard/home"} className="text-lg font-bold absolute top-5 left-8">
              Back
            </Link>
            <div className="flex gap-4 p-4">
              <div className="flex flex-col gap-4">
                {thumbnail && <img src={`/produkImg/${thumbnail}`} alt="" className="w-72 h-64 border-2 border-black object-cover object-center" />}
                <div className="flex gap-4">
                  {produkSingle.FotoProduk.map((el,i) => (
                    <img key={i} src={`/produkImg/${el}`} alt="" className="w-16 h-10 object-cover object-center border-2 border-black" onMouseMove={() => setThumbnail(el)} />
                  ))}
                </div>
              </div>
              <div className="text-white flex flex-col gap-4 p-4">
                <h1 className="text-4xl font-bold">{produkSingle.NamaProduk}</h1>
                <small className="text-slate-400 ">{produkSingle._id}</small>
                <pre className="text-5xl">{produkSingle.Harga.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</pre>
                <p>Stok : {produkSingle.Stok}</p>
                <h2>Created At: {produkSingle.createdAt.slice(0, 10).split("-").reverse().join("-")}</h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProdukDetail;
