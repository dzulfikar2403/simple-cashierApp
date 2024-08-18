import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Home from "./pages/dashboard/Home";
import { Provider, useDispatch, useSelector } from "react-redux";
import Store from "./redux/Store";
import ProdukDetail from "./pages/ProdukDetail";
import Produk from "./pages/dashboard/Produk";
import Pelanggan from "./pages/dashboard/Pelanggan";
import { useEffect } from "react";
import { login } from "./redux/reducer/authSlice";
import AuthLayout from "./components/layout/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserPage from "./pages/dashboard/UserPage";

function App() {
  return (
    <Provider store={Store}>
      <AppWithRouter />
    </Provider>
  );
}

//jika ingin mengdispatch, dispatch harus berada didalam naungan provider redux
function AppWithRouter() {
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state => state.authSlice);

  const checkUser = () => {
    const user = localStorage.getItem('user');        
    if (user) {
      dispatch(login(user));
    }
  };

  useEffect(() => {  
    checkUser();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<p>test</p>} />
        <Route path="/login" element={userInfo ? <Navigate to={'/dashboard/home'} /> : <Login />} />
        <Route path="/register" element={userInfo ? <Navigate to={'/dashboard/home'} /> : <Register /> } />
        <Route path="/dashboard/home" element={userInfo ? <Home /> : <Navigate to={'/login'}/>} />
        <Route path="/dashboard/produk" element={userInfo ? <Produk /> : <Navigate to={'/login'}/>} />
        <Route path="/produk/:id" element={userInfo ? <ProdukDetail /> : <Navigate to={'/login'}/>} />
        <Route path="/dashboard/pelanggan" element={userInfo ? <Pelanggan /> : <Navigate to={'/login'}/>} />
        <Route path="/dashboard/penjualan" element={userInfo ? <DashboardLayout /> : <Navigate to={'/login'}/>} />
        <Route path="/dashboard/user" element={userInfo?.role === 1 ? <UserPage /> : <Navigate to={'/dashboard/home'}/>} />
      </Routes>
    </Router>
  );
}

export default App;
