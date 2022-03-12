import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../utils/api";

export const loginPost = createAsyncThunk(
  "user/loginPost",
  async (user: any) => {
    const res = await axios.get(
      `http://localhost:4000/api/login?username=${user.userName}&password=${user.password}`
    );
    localStorage.setItem("token", res.data.token);
    const userAccount = await axios.get(`http://localhost:4000/api/user`, {
      headers: { Authorization: localStorage.getItem("token") as string },
    });
    return userAccount.data;
  }
);

export const postUser = createAsyncThunk("user/postUser", async (data: any) => {
  const res = await api.post(`/createUser`, data);
});

export const getUser = createAsyncThunk("user/getUser", async () => {
  const userAccount = await axios.get(`http://localhost:4000/api/user`, {
    headers: { Authorization: localStorage.getItem("token") as string },
  });
  return userAccount.data;
});

interface State {
  id: number | null;
  userType: string | null;
}

const initialState: State = {
  id: null,
  userType: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.id = action.payload.id;
      state.userType = action.payload.userType;
    },
    purgeUser: (state) => {
      state.id = null;
      state.userType = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginPost.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.userType = action.payload.userType;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.userType = action.payload.userType;
    });
  },
});

export default userSlice.reducer;
export const { setUser, purgeUser } = userSlice.actions;
