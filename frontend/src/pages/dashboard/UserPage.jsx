import React, { useEffect, useState } from "react";
import Table from "../../components/fragment/Table";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers, logout, registerUser } from "../../redux/reducer/authSlice";
import Loader from "../../components/element/Loader";
import Modal from "../../components/fragment/Modal";

const UserPage = () => {
  const dispatch = useDispatch();
  const tHeadUser = ["ID User", "Email", "Nama", "role", "aksi"];
  const { isLoading, users, userInfo, isError, isMessage } = useSelector((state) => state.authSlice);
  const [toggleTambah, setToggleTambah] = useState(false);
  const [valueForm, setValueForm] = useState({
    name: "",
    email: "",
    password: "",
    role: 2,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;

    setValueForm((pre) => ({
      ...pre,
      [name]: name === "role" ? parseInt(value) : value,
    }));
  };

  const handleSubmitTambah = (e) => {
    e.preventDefault();

    dispatch(registerUser(valueForm));
  };

  const handleDelete = (id) => {
    if (userInfo.id !== id) {
      dispatch(deleteUser(id));
    } else {
      dispatch(deleteUser(id)).then(() => {
        dispatch(logout());
      });
    }
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold ">Data User</h1>
          <input type="text" name="search" id="search" placeholder="Search" className="border-b border-sky-300 outline-none focus:border-b-2" />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <Table tHead={tHeadUser} onclickBtn={() => setToggleTambah((pre) => !pre)}>
            {users &&
              users.map((el, i) => (
                <Table.TableR key={i}>
                  <Table.TableTD>{el._id}</Table.TableTD>
                  <Table.TableTD>{el.name}</Table.TableTD>
                  <Table.TableTD>{el.email}</Table.TableTD>
                  <Table.TableTD>
                    {el.role === 1 && "Admin"}
                    {el.role === 2 && "petugas"}
                  </Table.TableTD>
                  <Table.TableTD>
                    <div className="flex gap-4 text-white font-semibold">
                      <button className="p-2 bg-rose-400" onClick={() => handleDelete(el._id)}>
                        del
                      </button>
                    </div>
                  </Table.TableTD>
                </Table.TableR>
              ))}
          </Table>
        )}
      </div>
      {toggleTambah && (
        <Modal onclickModal={() => setToggleTambah((pre) => !pre)}>
          <Modal.form onsubmit={handleSubmitTambah} type={"tambah"} isError={isError} isSucces={isMessage}>
            <Modal.input title={"Name"} nameId={"name"} type={"text"} onchange={handleInput} />
            <Modal.input title={"Email"} nameId={"email"} type={"text"} onchange={handleInput} />
            <Modal.input title={"Password"} nameId={"password"} type={"text"} onchange={handleInput} />
            <label htmlFor="roles">Choose a role :</label>
          <select id="roles" name="role" className="mx-auto text-center w-1/2 px-2 outline-none rounded border-2 border-sky-200">
              <option value={1} className="text-white bg-sky-950 ">admin</option>
              <option value={2} className="text-white bg-sky-950">petugas</option>
            </select>
          </Modal.form>
        </Modal>
      )}
    </DashboardLayout>
  );
};

export default UserPage;
