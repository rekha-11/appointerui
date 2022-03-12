import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function ViewCompanyPage() {
  const company = useSelector((state: RootState) => state.company);
  return <div>ViewCompanyPage</div>;
}
