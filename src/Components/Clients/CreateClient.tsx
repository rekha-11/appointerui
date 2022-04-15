import { Form, Formik } from "formik";
import React from "react";
import PrimaryButton from "../../reuseable/button/PrimaryButton";
import FormikTextField from "../../reuseable/formikComponents/FormikTextField";
import { useAppSelector } from "../../store/hooks";

type Props = {
  hadleCreateClient: any;
};

export default function CreateClient(props: Props) {
  const { hadleCreateClient } = props;
  const companyId = useAppSelector((state) => state.user.companyId);

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    companyId: companyId,
  };

  return (
    <div style={{ width: "100%" }}>
      <Formik initialValues={initialValues} onSubmit={hadleCreateClient}>
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <FormikTextField
              errors={errors}
              values={values}
              setFieldValue={setFieldValue}
              touched={touched}
              name={"name"}
              label={"Name"}
            />
            <FormikTextField
              errors={errors}
              values={values}
              setFieldValue={setFieldValue}
              touched={touched}
              name={"phone"}
              label={"Phone"}
            />
            <FormikTextField
              errors={errors}
              values={values}
              setFieldValue={setFieldValue}
              touched={touched}
              name={"email"}
              label={"Email"}
            />
            <FormikTextField
              errors={errors}
              values={values}
              setFieldValue={setFieldValue}
              touched={touched}
              name={"age"}
              label={"Age"}
            />
            <PrimaryButton text={"Create"} />
          </Form>
        )}
      </Formik>
    </div>
  );
}
