import Card from "../../reuseable/Card/Card";
import React from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Info from "../../reuseable/Info";
import { RootState } from "../../store/store";
import CompanyTabPage from "../../pages/Company/CompanyTabPage";

export default function CompanyDetail() {
  const params = useParams();
  console.log(params);
  const companies = useSelector(
    (state: RootState) => state.company.companyList
  );
  const company = companies.filter((item: any) => item.id == params.id);
  console.log("company", company);

  return (
    <>
      <Card title={""}>
        <Info name="Company Name" value={company[0]?.name} />
      </Card>

      <CompanyTabPage />
    </>
  );
}
