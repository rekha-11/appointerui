import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../utils/api";

export const getSp = createAsyncThunk("clients/getSp", async (cId: number) => {
  const sp = await api.get(`/getSp/${cId}`);
  return sp.data;
});

export const postSp = createAsyncThunk("/postSp", async (data: any) => {
  const sp = await api.post("/createSp", data, {
    headers: { Authorization: localStorage.getItem("token") as string },
  });
  return sp.data;
});

export interface ServiceProviders {
  id?: number;
  name: string;
  description: string;
  email: string;
  gender: string;
  companyId: number;
}

interface State {
  ServiceProviders: ServiceProviders[];
}

const initialState: State = {
  ServiceProviders: [],
};

export const sp = createSlice({
  name: "spSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSp.fulfilled, (state, action) => {
      state.ServiceProviders = action.payload;
    });
    builder.addCase(postSp.fulfilled, (state, action) => {
      state.ServiceProviders = [...state.ServiceProviders, action.payload];
    });
  },
});

export default sp.reducer;
