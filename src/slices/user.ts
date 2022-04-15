import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../utils/api";

export const loginPost = createAsyncThunk(
  "user/loginPost",
  async (user: any, thunkApi) => {
    const res = await axios.get(
      `http://localhost:4000/api/login?username=${user.userName}&password=${user.password}`
    );
    localStorage.setItem("token", res.data.token);
    return res.data;
  }
);

export const postUser = createAsyncThunk("user/postUser", async (data: any) => {
  const res = await api.post(`/createUser`, { data });
  return res.data;
});

export const getUser = createAsyncThunk("user/getUser", async () => {
  const userAccount = await axios.get(`http://localhost:4000/api/user`, {
    headers: { Authorization: localStorage.getItem("token") as string },
  });
  return userAccount.data;
});

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (companyId: number) => {
    const userAccount = await axios.get(
      `http://localhost:4000/api/userList/${companyId}`,
      {
        headers: { Authorization: localStorage.getItem("token") as string },
      }
    );
    return userAccount.data;
  }
);

interface State {
  id: number | null;
  username: string;
  userType: string | null;
  userList: { username: string }[];
  companyId: number | null;
  companyName: string;
}

const initialState: State = {
  username: "",
  id: null,
  userType: null,
  userList: [],
  companyId: null,
  companyName: "",
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
    builder.addCase(loginPost.fulfilled, (state, action) => {});
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.companyName = action.payload.company.name;
      state.id = action.payload.id;
      if (action.payload.username) {
        state.username = action.payload.username;
      }
      state.userType = action.payload.usertype;
      state.companyId = action.payload.companyId;
    });
    builder.addCase(postUser.fulfilled, (state, action) => {
      state.userList = [...state.userList, action.payload];
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.userList = action.payload;
    });
  },
});

export default userSlice.reducer;
export const { setUser, purgeUser } = userSlice.actions;
