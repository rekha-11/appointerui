import React from "react";
import { Field } from "formik";
import { TextField } from "@mui/material";
// import { makeStyles, TextField } from "@mui/material";

// const useStyledTextField = makeStyles((theme: any) => ({
//   textFieldWrapper: {
//     marginBottom: theme.spacing(2),
//     opacity: "0.6",
//     letterSpacing: "1.5px",
//   },
// }));

type Props = {
  variant: string;
  label: string;
  name: string;
  values: any;
  setFieldValue: any;
  touched: any;
  errors: any;
};

const StyledMultiLineTextField = (props: Props) => {
  //   const classes = useStyledTextField();
  const { variant, label, name, values, setFieldValue, touched, errors } =
    props;
  return (
    <>
      <Field
        disabled={false}
        fullWidth
        error={Boolean(touched?.[name] && errors?.[name])}
        helperText={touched?.[name] && errors?.[name]}
        // className={classes.textFieldWrapper}
        component={TextField}
        multiline
        rows={10}
        name={name}
        label={label}
        value={values[name]}
        variant={variant}
        size="small"
        onChange={(event: any) => setFieldValue(name, event.target.value)}
      />
    </>
  );
};

export default StyledMultiLineTextField;
