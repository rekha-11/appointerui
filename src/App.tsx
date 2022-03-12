import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import RoutesCollection from "./routes/Routes";
import { getUser } from "./slices/user";
import { useAppDispatch, useAppSelector } from "./store/hooks";

function useAuthentication() {
  const authState = useAppSelector((state) => state.user.id);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!authState) navigate("/login");
  }, [authState, navigate]);
}

function App() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  // useAuthentication();
  return (
    <div>
      <CssBaseline enableColorScheme />
      <StyledEngineProvider injectFirst>
        <RoutesCollection />
      </StyledEngineProvider>
    </div>
  );
}

export default App;
