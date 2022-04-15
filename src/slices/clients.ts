import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";

export const getClients = createAsyncThunk(
  "clients/getClients",
  async (cId: number) => {
    const clients = await api.get(`/getClients/${cId}`);

    return clients.data;
  }
);

export const postClient = createAsyncThunk("/postClient", async (data: any) => {
  const client = await api.post("/createClients", data, {
    headers: { Authorization: localStorage.getItem("token") as string },
  });
  return client.data;
});

export interface Client {
  id?: number;
  name: string;
  phone: number;
  email: string;
  age: number;
  gendr: string;
  companyId: string;
}

interface State {
  clients: Client[];
}

const initialState: State = {
  clients: [],
};

export const clients = createSlice({
  name: "clientSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getClients.fulfilled, (state, action) => {
      state.clients = action.payload;
    });
    builder.addCase(postClient.fulfilled, (state, action) => {
      state.clients = [...state.clients, action.payload];
    });
  },
});

export default clients.reducer;
