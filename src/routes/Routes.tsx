import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import LoginPage from "../pages/login/LoginPage";
import Private from "./PrivateRoute";
import Company from "../pages/Company";
import CreateCompanyPage from "../pages/Company/CreateCompanyPage";
import CompanyDetail from "../Components/Company/CompanyDetail";
import CalendarPage from "../pages/Calendar/CalendarPage";

export default function RoutesCollection(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/dashboard"} />} />

      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/company/:id"
        element={
          <Private>
            <CompanyDetail />
          </Private>
        }
      />
      <Route
        path="/calendar"
        element={
          <Private>
            <CalendarPage />
          </Private>
        }
      />
      <Route
        path="/companies"
        element={
          <Private>
            <Company />
          </Private>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Private>
            <Dashboard />
          </Private>
        }
      />
      <Route
        path="/company/create"
        element={
          <Private>
            <CreateCompanyPage />
          </Private>
        }
      />
    </Routes>
  );
}
