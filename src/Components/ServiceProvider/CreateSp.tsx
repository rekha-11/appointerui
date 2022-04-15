import { Form, Formik } from "formik";
import React from "react";
import PrimaryButton from "../../reuseable/button/PrimaryButton";
import FormikTextField from "../../reuseable/formikComponents/FormikTextField";
import MultiLineTextField from "../../reuseable/MultiLineTextField";
import { useAppSelector } from "../../store/hooks";

type Props = {
  handleColse: any;
  handleCreateSp: any;
};

export default function CreateSp(props: Props) {
  const { handleColse, handleCreateSp } = props;
  const companyId = useAppSelector((state) => state.user.companyId);
  const initialValues = {
    name: "",
    description: "",
    email: "",
    companyId: companyId,
  };
  return (
    <>
      <div>
        <div style={{ fontWeight: "500", opacity: "0.7", fontSize: "24px" }}>
          Add Service Provider
        </div>
        <Formik initialValues={initialValues} onSubmit={handleCreateSp}>
          {({ errors, touched, setFieldValue, values }) => {
            return (
              <Form>
                <FormikTextField
                  name={"name"}
                  label={"Full Name"}
                  values={values}
                  touched={touched}
                  errors={errors}
                  setFieldValue={setFieldValue}
                />
                <FormikTextField
                  name={"email"}
                  label={"Email"}
                  values={values}
                  touched={touched}
                  errors={errors}
                  setFieldValue={setFieldValue}
                />
                <MultiLineTextField
                  variant={"outlined"}
                  label={"Description"}
                  name={"description"}
                  values={values}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  errors={errors}
                />
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <PrimaryButton text={"create"} />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}
