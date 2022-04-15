import React from "react";
import Dashboard from "../../Components/Dashboard/Dashboard";
import { getBookings } from "../../slices/bookingSlice";
import { getClients } from "../../slices/clients";
import { getSp } from "../../slices/spSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Company from "../Company";

export default function DashboardPage() {
  const dispatch = useAppDispatch();

  const companyId = useAppSelector((state) => state.user.companyId);

  React.useEffect(() => {
    dispatch(getClients(companyId as number));
    dispatch(getSp(companyId as number));
    dispatch(getBookings(companyId as number));
  }, [dispatch, companyId]);
  return (
    <>
      <div>
        <Dashboard />
      </div>
    </>
  );
}
