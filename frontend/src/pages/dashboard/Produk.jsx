import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Table from "../../components/fragment/Table";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts, getProductsById, postProduct, setProdukMessageNull, updateProduct } from "../../redux/reducer/produkSlice";
import Loader from "../../components/element/Loader";
import Modal from "../../components/fragment/Modal";

const Produk = () => {
  const dispatch = useDispatch();
  const [tHeadProduk, setTHeadProduk] = useState([]);
  const { produk, produkSingle, isLoading, isMessage } = useSelector((state) => state.produkSlice);
  const [toggleTambah, setToggleTambah] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [fileForm, setFileForm] = useState([]);
  const [errorForm, setErrorForm] = useState(null);
  const [dataTemp, setDataTemp] = useState(null);
  const [valueForm, setValueForm] = useState({
    NamaProduk: "",
    Harga: 0,
    Stok: 0,
  });


  //global func
  const handleInput = (e) => {
    const { name, value } = e.target;
    setValueForm((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const { files } = e.target;
    if (files.length > 3) {
      setFileForm("must be 3 image");
    } else {
      setFileForm([...files]);
    }
  };

  //tambahData
  const openHandleTambah = () => {
    setToggleTambah((pre) => !pre);
  };

  const closeHandleTambah = () => {
    setToggleTambah((pre) => !pre);
    dispatch(setProdukMessageNull());
    setErrorForm(null);
  };

  const handleSubmitTambah = (e) => {
    e.preventDefault();

    if (typeof fileForm !== "object") {
      setErrorForm("must be 3 image!!");
      return;
    }

    const formData = new FormData();
    formData.append("NamaProduk", valueForm.NamaProduk);
    formData.append("Harga", valueForm.Harga);
    formData.append("Stok", valueForm.Stok);
    fileForm.forEach((el) => {
      formData.append("FotoProduk", el);
    });

    dispatch(postProduct(formData))
  };

  //editData
  const openHandleEdit = (dataID) => {
    setToggleEdit((pre) => !pre);
    dispatch(getProductsById(dataID));
  };

  const closeHandleEdit = () => {
    setToggleEdit((pre) => !pre);
    dispatch(setProdukMessageNull());
    setErrorForm(null);

    setValueForm((pre) => ({
      ...pre,
      NamaProduk: "",
      Harga: 0,
      Stok: 0,
    }));
  };

  const handleSubmitEdit = (e,dataID) => {
    e.preventDefault();

    dispatch(updateProduct({id:dataID,dataObj:valueForm}))
  };

  // searchData
  const searching = (e) => {
    const { value } = e.target;

    const dataBySearch = produk.filter((el) => el.NamaProduk.toLowerCase().includes(value.toLowerCase()));
    setDataTemp(dataBySearch);
  };

  // useeffect
  useEffect(() => {
    setTHeadProduk(["ID Produk", "Nama Produk", "Harga", "Stock", "Aksi"]);
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    if (produk) {
      setDataTemp(produk);
    }
  }, [produk]);

  useEffect(() => {
    if (produkSingle) {
      setValueForm((pre) => ({
        ...pre,
        NamaProduk: produkSingle.NamaProduk,
        Harga: produkSingle.Harga,
        Stok: produkSingle.Stok,
      }));
    }
  }, [produkSingle]);

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold ">Data Produk</h1>
          <input type="text" name="search" id="search" placeholder="Search" className="border-b border-sky-300 outline-none focus:border-b-2" onChange={searching} />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <Table tHead={tHeadProduk} onclickBtn={openHandleTambah}>
            {(dataTemp || []) &&
              dataTemp.map((el, i) => (
                <Table.TableR key={i}>
                  <Table.TableTD>{el._id}</Table.TableTD>
                  <Table.TableTD>{el.NamaProduk}</Table.TableTD>
                  <Table.TableTD>{el.Harga}</Table.TableTD>
                  <Table.TableTD>{el.Stok}</Table.TableTD>
                  <Table.TableTD>
                    <div className="flex gap-4 text-white font-semibold">
                      <button className="p-2 bg-rose-400" onClick={() => dispatch(deleteProduct(el._id))}>
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
          <Modal.form encType={"multipart/form-data"} type={"file"} isSucces={isMessage} isError={errorForm || (isMessage !== "success" && isMessage)} onsubmit={handleSubmitTambah}>
            <Modal.input title={"NamaProduk"} type={"text"} onchange={handleInput} />
            <Modal.input title={"Harga"} type={"number"} onchange={handleInput} />
            <Modal.input title={"Stok"} type={"number"} onchange={handleInput} />
            <Modal.input title={"FotoProduk"} type={"file"} multiple={true} onchange={handleImage} />
          </Modal.form>
        </Modal>
      )}
      {toggleEdit && (
        <Modal onclickModal={closeHandleEdit}>
          {produkSingle && (
            <Modal.form isSucces={isMessage} isError={errorForm || (isMessage !== "success" && isMessage)} onsubmit={(e) => handleSubmitEdit(e,produkSingle._id)}>
              <Modal.input title={"NamaProduk"} type={"text"} value={valueForm.NamaProduk} onchange={handleInput} />
              <Modal.input title={"Harga"} type={"number"} value={valueForm.Harga} onchange={handleInput} />
              <Modal.input title={"Stok"} type={"number"} value={valueForm.Stok} onchange={handleInput} />
            </Modal.form>
          )}
        </Modal>
      )}
    </DashboardLayout>
  );
};

export default Produk;
