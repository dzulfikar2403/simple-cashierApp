import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Table from "../../components/fragment/Table";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/element/Loader";
import Modal from "../../components/fragment/Modal";
import { deletePelanggan, getPelangganData, postPelanggan, setPelangganMessageNull, setPelangganSingle, updatePelanggan } from "../../redux/reducer/pelangganSlice";

const Pelanggan = () => {
  const dispatch = useDispatch();
  const [tHeadProduk, setTHeadProduk] = useState([]);
  const { pelanggan, pelangganSingle, isLoading, isMessage } = useSelector((state) => state.pelangganSlice);
  const [toggleTambah, setToggleTambah] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [dataTemp, setDataTemp] = useState(null);
  const [valueForm, setValueForm] = useState({
    NamaPelanggan: "",
    Alamat: "",
    NomorTelepon: "",
  });

  //global func
  const handleInput = (e) => {
    const { name, value } = e.target;
    setValueForm((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  //tambahData
  const openHandleTambah = () => {
    setToggleTambah((pre) => !pre);
  };

  const closeHandleTambah = () => {
    setToggleTambah((pre) => !pre);
    dispatch(setPelangganMessageNull());
  };

  const handleSubmitTambah = (e) => {
    e.preventDefault();

    dispatch(postPelanggan(valueForm))
  };

  //editData
  const openHandleEdit = (dataID) => {
    setToggleEdit((pre) => !pre);
    dispatch(setPelangganSingle(dataID));
  };

  const closeHandleEdit = () => {
    setToggleEdit((pre) => !pre);
    dispatch(setPelangganMessageNull());

    setValueForm((pre) => ({
      ...pre,
      NamaPelanggan: "",
      Alamat: "",
      NomorTelepon: "",
    }));
  };

  const handleSubmitEdit = (e, dataID) => {
    e.preventDefault();

    dispatch(updatePelanggan({ id: dataID, dataObj: valueForm }))
  };

  // searchData
  const searching = (e) => {
    const { value } = e.target;

    const dataBySearch = pelanggan.filter((el) => el.NamaPelanggan.toLowerCase().includes(value.toLowerCase()));
    setDataTemp(dataBySearch);
  };

  // useeffect
  useEffect(() => {
    setTHeadProduk(["ID Pelanggan", "Nama", "Alamat", "No.Telp", "Aksi"]);
    dispatch(getPelangganData());
  }, []);

  useEffect(() => {
    if (pelanggan) {
      setDataTemp(pelanggan);
    }
  }, [pelanggan]);

  useEffect(() => {
    if (pelangganSingle) {
      setValueForm((pre) => ({
        ...pre,
        NamaPelanggan: pelangganSingle.NamaPelanggan,
        Alamat: pelangganSingle.Alamat,
        NomorTelepon: pelangganSingle.NomorTelepon,
      }));
    }
  }, [pelangganSingle]);

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold ">Data Pelanggan</h1>
          <input type="text" name="search" id="search" placeholder="Search" className="border-b border-sky-300 outline-none focus:border-b-2" onChange={searching} />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <Table tHead={tHeadProduk} onclickBtn={openHandleTambah}>
            {dataTemp &&
              dataTemp.map((el, i) => (
                <Table.TableR key={i}>
                  <Table.TableTD>{el._id}</Table.TableTD>
                  <Table.TableTD>{el.NamaPelanggan}</Table.TableTD>
                  <Table.TableTD>{el.Alamat}</Table.TableTD>
                  <Table.TableTD>{el.NomorTelepon}</Table.TableTD>
                  <Table.TableTD>
                    <div className="flex gap-4 text-white font-semibold">
                      <button className="p-2 bg-rose-400" onClick={() => dispatch(deletePelanggan(el._id))}>
                        del
                      </button>
                      <button className="p-2 bg-yellow-400" onClick={() => openHandleEdit(el._id)}>
                        edit
                      </button>
                    </div>
                  </Table.TableTD>
                </Table.TableR>
              ))}
          </Table>
        )}
      </div>
      {toggleTambah && (
        <Modal onclickModal={closeHandleTambah}>
          <Modal.form isSucces={isMessage} isError={isMessage !== "success post" && isMessage} onsubmit={handleSubmitTambah}>
            <Modal.input title={"NamaPelanggan"} type={"text"} onchange={handleInput} />
            <Modal.input title={"Alamat"} type={"text"} onchange={handleInput} />
            <Modal.input title={"NomorTelepon"} type={"text"} onchange={handleInput} />
          </Modal.form>
        </Modal>
      )}
      {toggleEdit && (
        <Modal onclickModal={closeHandleEdit}>
          {pelangganSingle && (
            <Modal.form isSucces={isMessage} isError={isMessage !== "success update data" && isMessage} onsubmit={(e) => handleSubmitEdit(e, pelangganSingle._id)}>
              <Modal.input title={"NamaPelanggan"} type={"text"} value={valueForm.NamaPelanggan} onchange={handleInput} />
              <Modal.input title={"Alamat"} type={"text"} value={valueForm.Alamat} onchange={handleInput} />
              <Modal.input title={"NomorTelepon"} type={"text"} value={valueForm.NomorTelepon} onchange={handleInput} />
            </Modal.form>
          )}
        </Modal>
      )}
    </DashboardLayout>
  );
};

export default Pelanggan;
