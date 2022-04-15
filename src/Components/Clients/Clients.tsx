import React, { useMemo, useState } from "react";
import { getClients } from "../../slices/clients";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import List from "../../reuseable/list/Index";
import PrimaryButton from "../../reuseable/button/PrimaryButton";
import { Link } from "react-router-dom";
import { Button, Dialog, DialogContent } from "@mui/material";
import CreateClientPage from "../../pages/Clients/CreateClientPage";

type Props = {};

export default function Clients(props: Props) {
  const dispatch = useAppDispatch();
  const clients = useAppSelector((state) => state.clients.clients);
  const companyId = useAppSelector((state) => state.user.companyId);

  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    dispatch(getClients(Number(companyId)));
  }, [dispatch, companyId]);

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Email", accessor: "email" },
      { Header: "Age", accessor: "age" },
    ],
    []
  );
  return (
    <div>
      <List
        columns={columns}
        data={clients}
        url={"company"}
        addButton={
          <>
            <Button onClick={() => setOpen(true)}>Add New</Button>
          </>
        }
      />
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true}>
        <DialogContent>
          <CreateClientPage handleClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
