import { Autocomplete, TextField } from "@mui/material";
import React from "react";
type Props = {
  option: any;
  label: string;
  value: any;
  setValue: any;
  name: string;
};

export default function AutoComplete(props: Props) {
  const { option, label, value, setValue, name } = props;
  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={option}
        sx={{ width: "auto" }}
        getOptionLabel={(option: any) => {
          return option.name ?? option.name;
        }}
        // defaultValue={value}
        renderInput={(params) => <TextField {...params} label={label} />}
        onChange={(e, value: any) => {
          value
            ? setValue((prevState: any) => ({ ...prevState, [name]: value.id }))
            : setValue((prevState: any) => ({ ...prevState, [name]: "" }));
        }}
      />
    </div>
  );
}
