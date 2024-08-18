import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import useDecodejwt from "../../hooks/useDecodejwt";

export const getAllUsers = createAsyncThunk("auth/getAllUsers",async () => {
  const {data} = await axios.get("http://localhost:3000/users/");

  return data;
})

export const deleteUser = createAsyncThunk("auth/deleteUser",async (id,thunkAPI) => {
  if(confirm("are you sure ?") === true){
    try {
      const {data} = await axios.delete(`http://localhost:3000/users/${id}`);
      thunkAPI.dispatch(logout());

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
})

export const loginAuth = createAsyncThunk("auth/loginAuth", async (obj,thunkApi) => {
  const { decodeJwt } = useDecodejwt();

  try {
    const { data } = await axios.post("http://localhost:3000/users/login", obj);

    const token = data.token;
    if (token) {
      const payloadJwt = decodeJwt(token);
      const finalObj = {
        ...payloadJwt,
        token,
      };

      localStorage.setItem("user", JSON.stringify(finalObj));
      console.log(finalObj);

      return finalObj;
    }
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data)
  }
});

const initialState = {
  users: null,
  userInfo: null,
  isLoading: true,
  isMessage: null,
  isError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo = JSON.parse(action.payload); // parsing dari localstorage
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    // getAllUsers
    builder.addCase(getAllUsers.fulfilled, (state,action)  => {
      state.isLoading = false;
      state.users = action.payload;
    })

    //deleteUser
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isMessage = action.payload;
      state.isError = null;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isError = action.payload;
    });

    // loginAuth
    builder.addCase(loginAuth.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      state.isError = null;
    });
    builder.addCase(loginAuth.rejected, (state, action) => {
      state.isError = action.payload;
    });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
