import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";

export const getBookings = createAsyncThunk(
  "/getBookings",
  async (cId: number) => {
    const bookings = await api.get(`/bookings?cId=${cId}`);
    return bookings.data;
  }
);

export const postBooking = createAsyncThunk(
  "/postBooking",
  async (data: Partial<Booking>) => {
    const bookings = await api.post(`/bookings`, data, {
      headers: { Authorization: localStorage.getItem("token") as string }
    });
    return bookings.data;
  }
);

export interface Booking {
  id?: number;
  bookingStartDate: Date;
  bookingEndDate: Date;
  description: string;
  companyId: number;
}

interface State {
  bookings: Booking[];
}

const initialState: State = {
  bookings: []
};

export const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBookings.fulfilled, (state, action) => {
      state.bookings = action.payload;
    });
    builder.addCase(postBooking.fulfilled, (state, action) => {
      state.bookings = [...state.bookings, action.payload];
    });
  }
});

export default bookingSlice.reducer;
