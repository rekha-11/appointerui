import React, { useState } from "react";
import AutoComplete from "../../reuseable/AutoComplete";
import BigCalendar from "../../reuseable/BigCalendar";
import { getBookings } from "../../slices/bookingSlice";
import { getSp } from "../../slices/spSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function Calendar() {
  const dispatch = useAppDispatch();
  const companyId = useAppSelector((state) => state.user.companyId);

  const serviceProviders = useAppSelector(
    (state) => state.ServiceProviders.ServiceProviders
  );

  let spList: any = [];
  serviceProviders?.map((item) =>
    spList.push({ name: item.name, id: item.id })
  );
  const [sp, setSp] = useState({});

  React.useEffect(() => {
    dispatch(getBookings(companyId as number));
  }, [dispatch, companyId]);
  return (
    <div>
      <div style={{ width: "300px" }}>
        <AutoComplete
          option={spList}
          label={"Select Service Provider"}
          value={sp}
          setValue={setSp}
          name={"sp"}
        />
      </div>

      <BigCalendar sp={sp} selectable={sp ? true : false} />
    </div>
  );
}
