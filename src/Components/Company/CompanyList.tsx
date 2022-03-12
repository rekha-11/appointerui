import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../../reuseable/button/PrimaryButton";
import List from "../../reuseable/list/Index";

type Props = {
  data: any;
};

export default function CompanyList(props: Props) {
  const { data } = props;

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
