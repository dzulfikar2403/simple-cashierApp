import {configureStore} from "@reduxjs/toolkit"
import produkSlice from "./reducer/produkSlice";

const Store = configureStore({
  reducer:{
    produkSlice 
  }
});

export default Store;