import React from "react";
import BigCalendar from "../../reuseable/BigCalendar";
import { getBookings } from "../../slices/bookingSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function Calendar() {
  const dispatch = useAppDispatch();
  const companyId = useAppSelector((state) => state.user.companyId);
  React.useEffect(() => {
    dispatch(getBookings(companyId as number));
  }, [dispatch, companyId]);
  return (
    <div>
      <BigCalendar />
    </div>
  );
}
