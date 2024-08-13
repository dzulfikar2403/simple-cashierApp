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

export const postProduct = createAsyncThunk('produk/postProduct',async (obj,thunkAPI) => {
  const {data} = await axios.post(`http://localhost:3000/produk`,obj);
  thunkAPI.dispatch(getProducts());
  
  return data;
})

//createasyncthunk hanya menerima 1 parameter, jika ingin lebih bungkus dalam 1 object dan destructure mereka.
export const updateProduct = createAsyncThunk('produk/updateProduct',async ({id,dataObj},thunkAPI) => {
  const {data} = await axios.put(`http://localhost:3000/produk/${id}`,dataObj);
  thunkAPI.dispatch(getProducts());

  console.log(dataObj);
  return data;
})

export const deleteProduct = createAsyncThunk('produk/deleteProduct',async (id,thunkAPI) => {
  if (confirm("Yakin dek ???") === true) {
    const {data} = await axios.delete(`http://localhost:3000/produk/${id}`);
    thunkAPI.dispatch(getProducts());

    return data;
  } else {
    alert("dek dek dibilang jangan... -_-");
  }
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
    setProdukMessageNull: (state) => {
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

export const {setProdukMessageNull} = produkSlice.actions;
export default produkSlice.reducer;