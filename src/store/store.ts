import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import user from "../slices/user";
import company from "../slices/company";
import booking from "../slices/bookingSlice";
import clients from "../slices/clients";
import ServiceProviders from "../slices/spSlice";

export const store = configureStore({
  reducer: {
    user,
    company,
    booking,
    clients,
    ServiceProviders,
  },
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
