import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";

type Props = {
  label: string;
  name: string;
  errors: any;
  values: any;
  setFieldValue: any;
  touched: any;
};

export default function Time(props: Props) {
  const { label, name, errors, values, setFieldValue, touched } = props;

  const handleOnChange = (value: any) => {
    setFieldValue(name, value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileTimePicker
        label={label}
        value={values[name]}
        onChange={(e: any) => handleOnChange(e)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
