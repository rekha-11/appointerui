import React from "react";
import Clients from "../../Components/Clients/Clients";
import { postClient } from "../../slices/clients";
import { useAppDispatch } from "../../store/hooks";

export default function ClientsPage() {
  const dispatch = useAppDispatch();

  return (
    <div>
      <Clients />
    </div>
  );
}
