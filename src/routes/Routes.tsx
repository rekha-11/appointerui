import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import LoginPage from "../pages/login/LoginPage";
import Private from "./PrivateRoute";
import Company from "../pages/Company";
import CreateCompanyPage from "../pages/Company/CreateCompanyPage";
import CompanyDetail from "../Components/Company/CompanyDetail";
import CalendarPage from "../pages/Calendar/CalendarPage";
import ClientsPage from "../pages/Clients/ClientsPage";
import CreateClientPage from "../pages/Clients/CreateClientPage";
import ServiceProvidersPage from "../pages/ServiceProviders/ServiceProvidersPage";

export default function RoutesCollection(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/login"} />} />
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
        path="/serviceProviders"
        element={
          <Private>
            <ServiceProvidersPage />
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
        path="/clients"
        element={
          <Private>
            <ClientsPage />
          </Private>
        }
      />
      <Route
        path="/client/create"
        element={
          <Private>
            <CreateClientPage />
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
