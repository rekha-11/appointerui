import Card from "../../reuseable/Card/Card";
import React, { MouseEventHandler } from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Info from "../../reuseable/Info";
import { RootState } from "../../store/store";
import CompanyTabPage from "../../pages/Company/CompanyTabPage";
import PrimaryButton from "../../reuseable/button/PrimaryButton";
import { useAppDispatch } from "../../store/hooks";
import { deleteCompany } from "../../slices/company";

export default function CompanyDetail() {
  const params = useParams();
  const dispatch = useAppDispatch();

  const companies = useSelector(
    (state: RootState) => state.company.companyList
  );
  const company = companies.filter((item: any) => item.id == params.id);

  const handleDeleteCompany: MouseEventHandler<HTMLDivElement> = (Cid: any) => {
    dispatch(() => deleteCompany(Cid));
  };
  console.log(params);

  return (
    <>
      <PrimaryButton
        // onClick={handleDeleteCompany(parseInt(params.id) as any)}
        text={"Delete Company"}
      />
      <CompanyTabPage />
    </>
  );
}
