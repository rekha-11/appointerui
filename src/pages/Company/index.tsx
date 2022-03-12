import * as React from "react";
import { getCompanies } from "../../slices/company";
import Loadable from "react-loadable";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import LoadingSpinner from "../../reuseable/Spinner/LoadingSpinner";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const CompanyListComponent = Loadable({
  loader: () => import("../../Components/Company/CompanyList"),
  loading: LoadingSpinner,
});

export default function Company() {
  const companyList = useAppSelector((state) => state.company.companyList);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  return <CompanyListComponent data={companyList} />;
}
