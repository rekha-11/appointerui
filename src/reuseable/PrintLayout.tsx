import { Satellite } from "@mui/icons-material";
import { template } from "lodash";
import React from "react";
import { useAppSelector } from "../store/hooks";

type Props = { bookings: any; sp: any };

const PrintLayout = React.forwardRef((props: Props, ref: any) => {
  const { bookings, sp } = props;

  const serviceProviders = useAppSelector(
    (state) => state.ServiceProviders.ServiceProviders
  );
  const clients = useAppSelector((state) => state.clients.clients);

  const findSp = () => {
    if (sp.sp) {
      return serviceProviders.filter((item) => item.id === sp.sp)[0].name;
    } else return null;
  };

  const findClient = (Cid: any) => {
    return clients.filter((item) => item.id === Cid)[0].name;
  };

  console.log("bookings", sp, bookings);
  return (
    <div ref={ref}>
      <div style={{ padding: "32px", width: "100%" }}>
        <h1 style={{ display: "flex", justifyContent: "center" }}>Agenda</h1>
        <h2>For {findSp()}</h2>
        <div>
          <table
            style={{ border: "1", borderCollapse: "collapse", width: "100%" }}
          >
            <thead style={{ width: "20%" }}>
              <td>Time</td>
              <td>Client</td>
            </thead>
            <tbody>
              {bookings.map((item: any, index: number) => (
                <tr key={index}>
                  <td>
                    {new Date(item.bookingStartDate).getHours()}:
                    {new Date(item.bookingStartDate).getMinutes()} -
                    {new Date(item.bookingEndDate).getHours()}:
                    {new Date(item.bookingEndDate).getMinutes()}
                  </td>
                  <td>
                    <div>
                      <b>{item.status}</b>
                    </div>
                    <div>{findClient(item.clientId)}</div>
                    <div>{item.description}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

export default PrintLayout;
