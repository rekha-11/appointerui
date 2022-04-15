import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../utils/api";

export const postCompany = createAsyncThunk(
  "/companies/postCompanies",
  async (data: any) => {
    const companies = await api.post("/createCompany", data);

    return companies.data;
  }
);

export const deleteCompany = createAsyncThunk(
  "/companies/deleteCompany",
  async (id: number) => {
    await api.delete(`/deleteCompany/${id}`);
    console.log(id);
    return id;
  }
);

export const getCompanies = createAsyncThunk(
  "/companies/getCompanies",
  async () => {
    const companies = await axios.get(
      `http://localhost:4000/api/companiesList`,
      {
        headers: { Authorization: localStorage.getItem("token") as string },
      }
    );

    return companies.data;
  }
);

export const getCompany = createAsyncThunk("/company/getCompany", async () => {
  const company = await axios.get(`http://localhost:4000/api/companiesList`, {
    headers: { Authention: localStorage.getItem("token") as string },
  });
});

interface State {
  companyList: any;
}

const initialState: State = {
  companyList: [],
};

export const companyListSlice = createSlice({
  name: "companyListSlice",
  initialState,
  reducers: {
    setCompanyList: (state, action: PayloadAction<number>) => {
      state.companyList = action.payload;
    },
    purgeCompanyList: (state) => {
      state.companyList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCompanies.fulfilled, (state, action) => {
      state.companyList = action.payload;
    });
    builder.addCase(postCompany.fulfilled, (state, action) => {
      state.companyList = [...state.companyList, action.payload];
    });
    builder.addCase(deleteCompany.fulfilled, (state, action) => {
      state.companyList = state.companyList.filter(
        (el: any) => el.id !== action.payload
      );
    });
  },
});

//   builder.addCase(getCompanies.fulfilled, (state, action) => {
//     state.id = action.payload;
//   });
// },

export default companyListSlice.reducer;

export const { setCompanyList, purgeCompanyList } = companyListSlice.actions;
