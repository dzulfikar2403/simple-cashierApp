import React, { useEffect } from "react";
import Table from "../../components/fragment/Table";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../../redux/reducer/authSlice";
import Loader from "../../components/element/Loader";

const UserPage = () => {
  const tHeadUser = ["ID User", "Email", "Nama", "role", "aksi"];
  const dispatch = useDispatch();
  const { isLoading, users } = useSelector((state) => state.authSlice);

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
          <Table tHead={tHeadUser}>
            {users &&
              users.map((el, i) => (
                <Table.TableR key={i}>
                  <Table.TableTD>{el._id}</Table.TableTD>
                  <Table.TableTD>{el.name}</Table.TableTD>
                  <Table.TableTD>{el.email}</Table.TableTD>
                  <Table.TableTD>
                    {el.role === 1 && Admin}
                    {el.role === 2 && petugas}
                  </Table.TableTD>
                  <Table.TableTD>
                    <div className="flex gap-4 text-white font-semibold">
                      <button className="p-2 bg-rose-400" onClick={() => dispatch(deleteUser(el._id))}>
                        del
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

export default UserPage;
