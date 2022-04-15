import { Button, Dialog, DialogContent } from "@mui/material";
import React, { useState } from "react";
import List from "../../reuseable/list/Index";
import CreateSp from "./CreateSp";
import { useAppDispatch } from "../../store/hooks";
import { postSp } from "../../slices/spSlice";

type Props = {
  spList: any;
};

export default function ServiceProvider(props: Props) {
  const dispatch = useAppDispatch();

  const { spList } = props;
  const [openDialogue, setOpenDialogue] = useState(false);
  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    { Header: "Email", accessor: "email" },
  ];

  const handleCreateSp = (values: any) => {
    dispatch(postSp(values));
    setOpenDialogue(false);
  };
  return (
    <>
      <div>
        <List
          columns={columns}
          data={spList}
          addButton={
            <>
              <Button onClick={() => setOpenDialogue(true)}>Create</Button>
            </>
          }
        />
      </div>
      <Dialog
        open={openDialogue}
        onClose={() => setOpenDialogue(false)}
        fullWidth={true}
      >
        <DialogContent>
          <CreateSp
            handleColse={setOpenDialogue}
            handleCreateSp={handleCreateSp}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
