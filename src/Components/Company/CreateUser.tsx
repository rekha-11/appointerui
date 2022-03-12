import { Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import PrimaryButton from "../../reuseable/button/PrimaryButton";
import FormikTextField from "../../reuseable/formikComponents/FormikTextField";
import { postUser } from "../../slices/user";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";

type Props = {};

export default function CreateUser(props: Props) {
  const id = useSelector((state: RootState) => state.user.id);
  const dispatch = useDispatch();

  const formInitialValues = {
    userName: "",
    companyId: id,
  };

  const handleCreateUser = (values: any) => {
    console.log(values);
    dispatch(postUser({ user: values.username, companyId: values.companyId }));
  };

  return (
    <>
      <Formik initialValues={formInitialValues} onSubmit={handleCreateUser}>
        {({ values, setFieldValue, errors, touched }) => (
          <>
            <Form>
              <div>
                <FormikTextField
                  name={"userName"}
                  label={"User Name"}
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
        )}
      </Formik>
    </>
  );
}
