import { Field } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";

type Props = {
  name: string;
  label: string;
  values: any;
  touched: any;
  errors: any;
  setFieldValue: any;
  handleChange?: any;
  helperText?: any;
};

export default function FormikTextField(props: Props) {
  const {
    name,
    label,
    values,
    touched,
    errors,
    setFieldValue,
    handleChange,
    helperText,
  } = props;

  const handleOnChange = (value: string) => {
    setFieldValue(name, value);
  };
  return (
    <div className="relative mb-6 rounded">
      <input
        type="text"
        name={name}
        className="relative peer  p-2 rounded w-full text-gray-700 focus: outline-none border-b-2 border-gray-300 focus:border-[#62d49f] transition duration-500"
        placeholder=" "
        value={values[name] ? values[name] : ""}
        onChange={(e: any) => handleOnChange(e.target.value)}
      />
      <p className="text-sm text-red-500">{errors[name]}</p>
      <p className="text-xs text-blue-500 ">{helperText}</p>

      <label className="absolute left-2 -top-2.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-gray-600 peer-focus:text-sm">
        {label}
      </label>
    </div>
  );
}
