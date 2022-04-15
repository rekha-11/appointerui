import React from "react";

type Props = {
  name: string;
  label: string;
  values: any;
  touched: any;
  errors: any;
  setFieldValue: any;
};

const FormikTimePicker = (props: Props) => {
  const { name, label, values, touched, errors, setFieldValue } = props;

  const time = new Date(values[name]);

  const handleOnChange = (value: string) => {
    setFieldValue(name, value);
  };
  return (
    <>
      <div className="mb-6 rounded  relative">
        <input
          style={{ width: "250px" }}
          id={"timePicker"}
          type="time"
          name={name}
          className="peer bg-gray-200 p-2 rounded w-full text-gray-700 focus: outline-none border-b-2 border-gray-300 focus:border-[#62d49f] transition duration-500"
          placeholder=" "
          // value={time}
          onChange={(e: any) => handleOnChange(e.target.value)}
        />
        <p>{errors[name]}</p>
        <label
          htmlFor={"timePicker"}
          className="absolute left-2 -top-2.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-gray-600 peer-focus:text-sm"
        >
          {label}
        </label>
      </div>
    </>
  );
};

export default FormikTimePicker;
