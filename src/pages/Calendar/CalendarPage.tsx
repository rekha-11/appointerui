import React from "react";
import Loadable from "react-loadable";
import Calendar from "../../Components/Clanedar/Calendar";
import { getClients } from "../../slices/clients";
import { getSp } from "../../slices/spSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function CalendarPage() {
  const dispatch = useAppDispatch();

  const companyId = useAppSelector((state) => state.user.companyId);

  React.useEffect(() => {
    dispatch(getClients(companyId as number));
    dispatch(getSp(companyId as number));
  }, [dispatch, companyId]);
  return (
    <div>
      <Calendar />
    </div>
  );
}
