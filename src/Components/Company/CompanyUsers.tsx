import React, { useMemo, useState } from "react";
import Popup from "../../reuseable/PopUp";
import List from "../../reuseable/list/Index";
import { Link } from "@mui/material";
import PrimaryButton from "../../reuseable/button/PrimaryButton";
import CreateUser from "./CreateUser";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUsers } from "../../slices/user";
import { useParams } from "react-router-dom";

export default function CompanyUsers() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getUsers(Number(id)));
  }, [dispatch, id]);

  const [openCreatePopup, setOpenCreatePopup] = useState(false);

  const userList = useAppSelector((state) => state.user.userList);

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "username" },
      { Header: "Action", accessor: "id" },
    ],
    []
  );
  return (
    <div>
      <List
        columns={columns}
        data={userList}
        url={`company/${id}/user`}
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
        <CreateUser handleClose={() => setOpenCreatePopup(false)} />
      </Popup>
    </div>
  );
}
