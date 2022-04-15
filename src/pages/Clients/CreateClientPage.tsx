import React from "react";
import CreateClient from "../../Components/Clients/CreateClient";
import { postClient } from "../../slices/clients";
import { useAppDispatch } from "../../store/hooks";

export default function CreateClientPage({ handleClose }: any) {
  const dispatch = useAppDispatch();

  const hadleCreateClient = (values: any) => {
    dispatch(postClient(values));
    handleClose();

    // {
    //   dispatch(postBooking(currentData));
    //   setOpen(false);
    //   setCurrentData({
    //     companyId,
    //     description: "",
    //   } as Booking);
    // }}
  };

  return (
    <div>
      <CreateClient hadleCreateClient={hadleCreateClient} />
    </div>
  );
}
