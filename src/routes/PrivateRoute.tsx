import { Box, CircularProgress } from "@mui/material";
import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Sidebar from "../pages/sidebar/Sidebar";
import { getUser } from "../slices/user";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import "./routes.scss";

export default function Private({ children }: { children: JSX.Element }) {
  const user = useAppSelector((state) => state.user.id);
  const location = useLocation();

  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    (async () => {
      if (!user) {
        dispatch(getUser());
      }
    })();
  }, [user, dispatch]);

  if (!user && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user && token) {
    return <CircularProgress />;
  }

  return (
    <div className="privateroute_root">
      <Sidebar />
      <Box
        width="100%"
        height="calc(100vh - 64px)"
        sx={{ overFlowY: "auto", mt: "64px", pt: "32px", pl: "32px" }}
      >
        {children}
      </Box>
    </div>
  );
}
