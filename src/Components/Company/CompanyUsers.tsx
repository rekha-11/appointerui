import React, { useMemo, useState } from "react";
import Popup from "../../reuseable/PopUp";
import List from "../../reuseable/list/Index";
import { Link } from "@mui/material";
import PrimaryButton from "../../reuseable/button/PrimaryButton";
import CreateUser from "./CreateUser";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../store/hooks";

export default function CompanyUsers() {
  const id = useSelector((state: RootState) => state.user.id);

  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  console.log("popup", openCreatePopup);
  const userList = [{ name: "User1", id: 1 }];

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Action", accessor: "id" },
    ],
    []
  );
  return (
    <div>
      <List
        columns={columns}
        data={userList}
        addButton={
          <>
            <div
              onClick={() => {
                setOpenCreatePopup(true);
              }}
            >
              <PrimaryButton text="Add New" color="primary" />
            </div>
          </>
        }
      />
      <Popup
        title={"Create User"}
        openPopup={openCreatePopup}
        setOpenPopup={setOpenCreatePopup}
      >
        <CreateUser />
      </Popup>
    </div>
  );
}
