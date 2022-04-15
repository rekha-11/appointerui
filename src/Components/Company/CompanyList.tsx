import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React, { MouseEventHandler, useMemo } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../../reuseable/button/PrimaryButton";
import List from "../../reuseable/list/Index";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../../store/hooks";
import { deleteCompany } from "../../slices/company";

type Props = {
  data: any;
};

export default function CompanyList(props: Props) {
  const { data } = props;
  const dispatch = useAppDispatch();

  const columns = useMemo(
    () => [
      { Header: "Plan Name", accessor: "name" },
      { Header: "Action", accessor: "id" },
    ],
    []
  );

  return (
    <List
      columns={columns}
      data={data}
      url={"company"}
      addButton={
        <>
          <Link to={"/company/create"}>
            <PrimaryButton text="Add New" />
          </Link>
        </>
      }
    />
  );
}
function dispatch(
  arg0: any
): React.MouseEventHandler<SVGSVGElement> | undefined {
  throw new Error("Function not implemented.");
}
