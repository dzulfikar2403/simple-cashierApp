import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPenjualanData = createAsyncThunk("penjualan/getAllPenjualanData", async () => {
  const {data} = await axios.get("http://localhost:3000/penjualan/");

  return data
})

export const purchaseProduk = createAsyncThunk("penjualan/purchaseProduk", async (obj,thunkAPI) => {
  try {
    const {data} = await axios.post("http://localhost:3000/penjualan/",obj);
  
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
})

export const deleteDataPenjualanById = createAsyncThunk("penjualan/deleteDataPenjualanById", async (id,thunkAPI) => {
  if(confirm("are you sure ?") === true){
    const {data} = await axios.delete(`http://localhost:3000/penjualan/${id}`);
    thunkAPI.dispatch(getAllPenjualanData());

    return data
  }
})

const initialState = {
  dataPenjualan: null,
  cardsProduk: [],
  cart: [],
  total: 0,
  isLoadingPurchase: false,
  isSuccess: null,
  isError: null,
}

const penjualanSlice = createSlice({
  name: "penjualan",
  initialState,
  reducers: {
    setCardsProduk: (state,action) => {
      state.cardsProduk = action.payload;
    },
    addProdukToCart: (state,action) => {  
      const matchData = state.cardsProduk.find((el) => el._id === action.payload._id);
      state.cardsProduk.map(el => el.amount = 1);
            
      const filteringAdd = state.cart.find(el => el._id === action.payload._id);
      if(filteringAdd === undefined){
        state.cart.unshift(matchData);
      }else{
        filteringAdd.amount += 1;
      }
    },
    increment: (state,action) => {
      state.cart.find(el => {
        if(el._id === action.payload){
          el.amount += 1;
        }
      })
    },
    decrement: (state,action) => {
      state.cart = state.cart.map(el => {
        if(el._id === action.payload){
          el.amount -= 1;
        }
        return el;
      }).filter(el => el.amount > 0);
    },
    totalHarga: (state) => {
      let allPrice = 0;
      state.cart.forEach(el => {
        allPrice += el.Harga * el.amount;
      })
      state.total = allPrice;
    }
  },
  extraReducers: (builder) => {
    //getAllData
    builder.addCase(getAllPenjualanData.fulfilled, (state,action) => {
      state.dataPenjualan = action.payload;
      state.isLoading = false;
      state.isError = null;
    })

    //purchaseProduk
    builder.addCase(purchaseProduk.pending, (state) => {
      state.isLoadingPurchase = true;
    })
    builder.addCase(purchaseProduk.fulfilled, (state,action) => {
      state.isSuccess = action.payload;
      state.isLoadingPurchase = false;
      state.isError = null;
    })
    builder.addCase(purchaseProduk.rejected, (state,action) => {
      state.isSuccess = null;
      state.isLoadingPurchase = false;
      state.isError = action.payload;
    })
  }
})

export const {addProdukToCart,setCardsProduk,increment,decrement,totalHarga} = penjualanSlice.actions;
export default penjualanSlice.reducer;
