import React from "react";
import { Form, Formik } from "formik";
import { ComapnyInitialValues } from "../../utils/FormInitialValues";
import FormikTextField from "../../reuseable/formikComponents/FormikTextField";
import PrimaryButton from "../../reuseable/button/PrimaryButton";
import Card from "../../reuseable/Card/Card";
import { useNavigate } from "react-router-dom";

type Props = {
  handleCreateCompany: any;
};

export default function CreateCompany(props: Props) {
  const { handleCreateCompany } = props;

  return (
    <>
      <Card title="Create Company">
        <Formik
          initialValues={ComapnyInitialValues}
          onSubmit={handleCreateCompany}
        >
          {({ values, errors, setFieldValue, touched }) => {
            return (
              <>
                <Form>
                  <div>
                    <FormikTextField
                      name={"companyName"}
                      label={"Company Name"}
                      values={values}
                      touched={touched}
                      errors={errors}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  <div>
                    <PrimaryButton text="Create" />
                  </div>
                </Form>
              </>
            );
          }}
        </Formik>
      </Card>
    </>
  );
}
