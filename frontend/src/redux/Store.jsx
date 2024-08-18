import {configureStore} from "@reduxjs/toolkit"
import produkSlice from "./reducer/produkSlice";
import pelangganSlice from "./reducer/pelangganSlice";
import authSlice from "./reducer/authSlice";

const Store = configureStore({
  reducer:{
    produkSlice,
    pelangganSlice,
    authSlice
  }
});

export default Store;