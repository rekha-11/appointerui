import { Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import PrimaryButton from "../../reuseable/button/PrimaryButton";
import FormikTextField from "../../reuseable/formikComponents/FormikTextField";
import { postUser } from "../../slices/user";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

type Props = {
  handleClose: () => void;
};

export default function CreateUser(props: Props) {
  const { handleClose } = props;
  const { id } = useParams();
  const dispatch = useDispatch();

  const formInitialValues = {
    userName: "",
    companyId: id,
  };

  const handleCreateUser = async (values: any) => {
    await dispatch(
      postUser({ user: values.userName, companyId: values.companyId })
    );
    handleClose();
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
