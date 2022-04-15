import React from "react";
import { getClients } from "../../slices/clients";
import { getSp } from "../../slices/spSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import DashboardFullScreen from "./DashboardFullScreen";

export default function Dashboard() {
  return (
    <div>
      <DashboardFullScreen />
    </div>
  );
}
