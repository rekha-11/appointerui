import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import internal from "stream";
import AutoComplete from "../../reuseable/AutoComplete";
import PrimaryButton from "../../reuseable/button/PrimaryButton";
import FormikAutoComplete from "../../reuseable/formikComponents/FormikAutoComplete";
import FormikTextField from "../../reuseable/formikComponents/FormikTextField";
import FormikTimePicker from "../../reuseable/formikComponents/FormikTimePicker";
import Time from "../../reuseable/formikComponents/Time";
import InputTextField from "../../reuseable/inputField/InputTextField";
import MultiLineTextField from "../../reuseable/MultiLineTextField";
import { postBooking } from "../../slices/bookingSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

type Props = {
  currentData: any;
  sp: any;
  handleClose: any;
};

export default function BookingForm(props: Props) {
  const { currentData, sp, handleClose } = props;
  const dispatch = useAppDispatch();
  const clientList = useAppSelector((state) => state.clients.clients);
  const companyId = useAppSelector((state) => state.user.companyId);

  const [selectedClient, setSelectedClient] = useState({ client: null });
  let clients: any = [];
  clientList.map((item) => clients.push({ title: item.name, id: item.id }));

  type Initial = {
    spId: internal;
    title: string;
    clientId: any;
    bookingStartDate: any;
    bookingEndDate: any;
    description: string;
    companyId: any;
    status: string;
  };

  console.log("currentData", currentData);

  const initialValues: Initial = {
    spId: sp.sp,
    title: "",
    clientId: selectedClient,
    bookingStartDate: new Date(currentData.bookingStartDate),
    bookingEndDate: new Date(currentData.bookingEndDate),
    description: "",
    companyId: companyId,
    status: "reserved",
  };

  console.log("currentData", currentData);

  console.log("initialValues", initialValues);

  // useEffect(()=>{setInitialValues((prevState)=>(...prevState, client: selectedClient))},[])

  const handleCreateBooking = (values: any) => {
    values.clientId = selectedClient.client && selectedClient.client;
    dispatch(postBooking(values));
    handleClose(false);
  };

  return (
    <div>
      <AutoComplete
        option={clientList}
        label={"Select Client"}
        value={selectedClient}
        setValue={setSelectedClient}
        name={"client"}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={handleCreateBooking}
        enableReinitialize
      >
        {({ errors, values, setFieldValue, touched }) => (
          <Form>
            <FormikTextField
              label={"Title"}
              name={"title"}
              errors={errors}
              values={values}
              setFieldValue={setFieldValue}
              touched={touched}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <Time
                label={"Start Time"}
                name={"bookingStartDate"}
                errors={errors}
                values={values}
                setFieldValue={setFieldValue}
                touched={touched}
              />
              <Time
                label={"End Time"}
                name={"bookingEndDate"}
                errors={errors}
                values={values}
                setFieldValue={setFieldValue}
                touched={touched}
              />
            </div>

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
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              <PrimaryButton text="Create" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
