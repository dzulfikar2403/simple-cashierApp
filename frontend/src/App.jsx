import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import DashboardLayout from "./components/layout/DashboardLayout"
import Home from "./pages/dashboard/Home"
import { Provider } from "react-redux"
import Store from "./redux/Store"
import ProdukDetail from "./pages/ProdukDetail"
import Produk from "./pages/dashboard/Produk"

function App() {
  return (
    <>
    <Provider store={Store}>
      <Router>
        <Routes>
          <Route path="/" element={<p>test</p>} />
          <Route path="/dashboard/home" element={<Home />} />
          <Route path="/dashboard/produk" element={<Produk />} />
          <Route path="/produk/:id" element={<ProdukDetail />} />
          <Route path="/dashboard/pelanggan" element={<DashboardLayout />} />
          <Route path="/dashboard/penjualan" element={<DashboardLayout />} />
          <Route path="/dashboard/user" element={<DashboardLayout />} />
        </Routes>
      </Router>
    </Provider>
    </>
  )
}

export default App
