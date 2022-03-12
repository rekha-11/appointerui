import React from "react";
import style from "./style.module.css";
import { TextField } from "@mui/material";

type Props = {
  label: string;
  onChange: any;
  type: string;
};

export default function InputTextField(props: Props) {
  const { label, onChange, type } = props;
  return (
    <TextField
      className={style.TextField}
      id={"demo-helper-text-misaligned"}
      type={type}
      label={label}
      onChange={onChange}
    />
  );
}
