import {configureStore} from "@reduxjs/toolkit"
import produkSlice from "./reducer/produkSlice";
import pelangganSlice from "./reducer/pelangganSlice";

const Store = configureStore({
  reducer:{
    produkSlice,
    pelangganSlice
  }
});

export default Store;