import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import React from "react";

type Props = {
  name: string;
  value: any;
};

export default function Info(props: Props) {
  const { name, value } = props;
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography color="textSecondary" className={"profileText"}>
          {name}
        </Typography>
        <TextField
          disabled
          value={value || ""}
          size={"small"}
          variant="outlined"
        />
      </div>
    </>
  );
}
