import { Card } from "@mui/material";
import React from "react";
import Loadable from "react-loadable";
import LoadingSpinner from "../../reuseable/Spinner/LoadingSpinner";
import Axios from "axios";
import { postCompany } from "../../slices/company";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompanyListComponent = Loadable({
  loader: () => import("../../Components/Company/CreateCompany"),
  loading: LoadingSpinner,
});

export default function CreateCompanyPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleCreateCompany = (v: any) => {
    navigate("/companies");
    dispatch(postCompany({ companyName: v.companyName }));
  };
  return (
    <>
      <CompanyListComponent handleCreateCompany={handleCreateCompany} />
    </>
  );
}
