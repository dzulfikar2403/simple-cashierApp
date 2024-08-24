import {configureStore} from "@reduxjs/toolkit"
import produkSlice from "./reducer/produkSlice";
import pelangganSlice from "./reducer/pelangganSlice";
import authSlice from "./reducer/authSlice";
import penjualanSlice from "./reducer/penjualanSlice";

const Store = configureStore({
  reducer:{
    produkSlice,
    pelangganSlice,
    penjualanSlice,
    authSlice,
  }
});

export default Store;