import { Field } from "formik";
import React from "react";

type Props = {
  values: any;
  label: string;
  name: string;
};

export default function RadioGroups(props: Props) {
  const { values, label, name } = props;

  return (
    <div>
      <h1>{label}</h1>

      <div
        role="group"
        aria-labelledby="my-radio-group"
        style={{ display: "flex" }}
      >
        <div>
          <label>
            <Field
              type="radio"
              name="picked"
              value={values[name] ? values[name] : ""}
            />
            Male
          </label>
        </div>
        <div style={{ marginLeft: "15px" }}>
          <label>
            <Field
              type="radio"
              name="picked"
              value={values[name] ? values[name] : ""}
            />
            Female
          </label>
        </div>
      </div>
    </div>
  );
}
