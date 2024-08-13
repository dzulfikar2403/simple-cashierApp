import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPelangganData = createAsyncThunk("pelanggan/getPelangganData", async () => {
  const { data } = await axios.get("http://localhost:3000/pelanggan");

  return data;
});

export const postPelanggan = createAsyncThunk("pelanggan/postPelanggan", async (obj, thunkAPI) => {
  const { data } = await axios.post(`http://localhost:3000/pelanggan`, obj);
  thunkAPI.dispatch(getPelangganData());

  return data;
});

export const updatePelanggan = createAsyncThunk("pelanggan/updatePelanggan", async ({ id, dataObj }, thunkAPI) => {
  const { data } = await axios.put(`http://localhost:3000/pelanggan/${id}`, dataObj);
  thunkAPI.dispatch(getPelangganData());
  
  return data;
});

export const deletePelanggan = createAsyncThunk("pelanggan/deletePelanggan", async (id, thunkAPI) => {
  if (confirm("Yakin dek ???") === true) {
    const { data } = await axios.delete(`http://localhost:3000/pelanggan/${id}`);
    thunkAPI.dispatch(getPelangganData());

    return data;
  } else {
    alert("dek dek dibilang jangan... -_-");
  }
});

const initialState = {
  pelanggan: [],
  pelangganSingle: null,
  isMessage: null,
  isLoading: true,
};

const pelangganSlice = createSlice({
  name: "pelanggan",
  initialState,
  reducers: {
    setPelangganMessageNull: (state) => {
      state.isMessage = null;
    },
    setPelangganSingle: (state, action) => {
      const pelangganById = state.pelanggan.filter((el) => el._id === action.payload);
      state.pelangganSingle = pelangganById[0];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPelangganData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pelanggan = action.payload;
    });

    builder.addCase(postPelanggan.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isMessage = action.payload;
    });

    builder.addCase(updatePelanggan.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isMessage = action.payload;
    });

    builder.addCase(deletePelanggan.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isMessage = action.payload;
    });
  },
});

export const { setPelangganMessageNull, setPelangganSingle } = pelangganSlice.actions;
export default pelangganSlice.reducer;
