import React, { useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Table from "../../components/fragment/Table";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/element/Loader";
import { deleteDataPenjualanById, getAllPenjualanData } from "../../redux/reducer/penjualanSlice";

const Penjualan = () => {
  const dispatch = useDispatch();
  const tHeadPenjualan = ["ID Penjualan", "Tanggal Penjualan", "Total-harga", "ID Member", "Aksi"];
  const { dataPenjualan, isLoading } = useSelector((state) => state.penjualanSlice);

  useEffect(() => {
    dispatch(getAllPenjualanData());
  }, []);

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold ">Data Penjualan</h1>
          <input type="text" name="search" id="search" placeholder="Search" className="border-b border-sky-300 outline-none focus:border-b-2" />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <Table tHead={tHeadPenjualan} type={"penjualan"}>
            {dataPenjualan &&
              dataPenjualan.map((el, i) => (
                <Table.TableR key={i}>
                  <Table.TableTD>{el._id}</Table.TableTD>
                  <Table.TableTD>{el.TanggalPenjualan.slice(0,10)}</Table.TableTD>
                  <Table.TableTD>{el.TotalHarga}</Table.TableTD>
                  <Table.TableTD>{el.MemberID}</Table.TableTD>
                  <Table.TableTD>
                    <div className="flex gap-4 text-white font-semibold">
                      <button className="p-2 bg-gradient-to-r from-rose-800 via-rose-500 to-rose-300 rounded" onClick={() => dispatch(deleteDataPenjualanById(el._id))}>
                        del
                      </button>
                      <button className="p-2 bg-gradient-to-r from-teal-800 via-teal-500 to-teal-300 rounded" >
                        Show
                      </button>
                    </div>
                  </Table.TableTD>
                </Table.TableR>
              ))}
          </Table>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Penjualan;
