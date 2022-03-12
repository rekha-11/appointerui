import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import style from "./style.module.css";
// import logo from "../../images/logo2.png";
import { useNavigate } from "react-router";
import { loginPost } from "../../slices/user";
import { useAppDispatch } from "../../store/hooks";
import InputTextField from "../../reuseable/inputField/InputTextField";
import PrimaryButton from "../../reuseable/button/PrimaryButton";

export default function Loginpage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <>
      <div className={style.root}>
        <div className={style.loginPanelBody}>
          <div className={style.loginContext}>
            <div className={style.loginHeader}>
              <div>
                <img className={style.logo} src="logo2.png" alt="Okhati Logo" />
              </div>
              <Typography
                variant="caption"
                gutterBottom
                className={style.subText}
              >
                Please login through your Appointer account
              </Typography>
            </div>
            <form>
              <Box>
                <div>
                  <InputTextField
                    type="text"
                    label="Username"
                    onChange={(e: any) => {
                      setUserName(e.target.value);
                    }}
                  />
                </div>
                <div style={{ marginTop: "10px" }}>
                  <InputTextField
                    type="password"
                    label="Password"
                    onChange={(e: any) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </Box>
            </form>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "32px",
              }}
            >
              <PrimaryButton
                text={"LOGIN"}
                variant="contained"
                aria-label="Login"
                type="submit"
                onClick={async () => {
                  await dispatch(loginPost({ userName, password }));
                  navigate("/dashboard");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
