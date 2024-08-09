import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios" 

export const getProducts = createAsyncThunk('produk/getProducts',async()=>{
  const {data} = await axios.get('http://localhost:3000/produk');
  
  return data;
})

export const getProductsById = createAsyncThunk('produk/getProductsById',async(id) => {
  const {data} = await axios.get(`http://localhost:3000/produk/${id}`);

  return data;
})

export const postProduct = createAsyncThunk('produk/postProduct',async (obj) => {
  const {data} = await axios.post(`http://localhost:3000/produk`,obj);
  
  return data;
})

export const updateProduct = createAsyncThunk('produk/updateProduct',async (id,obj) => {
  const {data} = await axios.put(`http://localhost:3000/produk/${id}`,obj);

  return data;
})

export const deleteProduct = createAsyncThunk('produk/deleteProduct',async (id) => {
  const {data} = await axios.delete(`http://localhost:3000/produk/${id}`);

  return data;
})

const initialState = {
  produk: [],
  produkSingle: null,
  isMessage: null,
  isLoading: true,
}

const produkSlice = createSlice({
  name: "produk",
  initialState,
  reducers:{
    setMessageNull: (state) => {
      state.isMessage = null;
    }
  },
  extraReducers: (builder) => {
    // getproduct
    builder.addCase(getProducts.fulfilled,(state,action) => {
      state.isLoading = false;
      state.produk = action.payload;
    });

    // getproductById
    builder.addCase(getProductsById.fulfilled,(state,action) => {
      state.isLoading = false;
      state.produkSingle = action.payload;
    });
    
    // postProduct
    builder.addCase(postProduct.fulfilled,(state,action) => {
      state.isLoading = false;
      console.log(action.payload);
      
      state.isMessage = action.payload;
    });
    
    // updateProduct
    builder.addCase(updateProduct.fulfilled,(state,action) => {
      state.isLoading = false;
      state.isMessage = action.payload;
    });
    
    // deleteProduct
    builder.addCase(deleteProduct.fulfilled,(state,action) => {
      state.isLoading = false;
      state.isMessage = action.payload;
    });
  }
})

export const {setMessageNull} = produkSlice.actions;
export default produkSlice.reducer;