import React, { useCallback, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useAppSelector } from "../../store/hooks";
import SettingsOverscanIcon from "@mui/icons-material/SettingsOverscan";
import Card from "../../reuseable/Card/Card";
import { startCase } from "lodash";
import moment from "moment";
import { clients } from "../../slices/clients";

interface FullScreenHandle {
  active: boolean;
  // Specifies if attached element is currently full screen.

  enter: () => Promise<void>;
  // Requests this element to go full screen.

  exit: () => Promise<void>;
  // Requests this element to exit full screen.

  node: React.MutableRefObject<HTMLDivElement | null>;
  // The attached DOM node
}

function DashboardFullScreen() {
  const handle = useFullScreenHandle();
  const bookings = useAppSelector((state) => state.booking.bookings);
  const [date, setDate] = useState(new Date());
  React.useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const client = useAppSelector((state) => state.clients.clients);

  const getClientName = (id: number) => {
    return client.filter((item) => item.id === id)[0].name;
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handle.enter}
          style={{
            margin: "10px",
            color: "primary",
          }}
        >
          <SettingsOverscanIcon />
        </button>
      </div>

      <FullScreen handle={handle}>
        {!handle.active && (
          <div
            style={{
              margin: "auto",
              alignContent: "center",
              height: "600px",
              width: "600px",
              backgroundColor: "white",
              color: "grey",
              borderRadius: "3%",
            }}
          >
            <div style={{ margin: "10px", padding: "10px" }}>
              <div style={{ marginBottom: "10px", fontWeight: "600" }}>
                Upcoming Bookings
              </div>
              {bookings
                .filter((el) => {
                  return moment(el.bookingStartDate).isBetween(
                    moment().startOf("hour"),
                    moment().endOf("day")
                  );
                })
                .map((item) => (
                  <div
                    style={{
                      margin: "5px",
                      backgroundColor: "#d5eaeb",
                      borderRadius: "2%",
                      padding: "5px",
                    }}
                  >
                    <div style={{ color: "#62d49f" }}>
                      {startCase(item.status)}
                    </div>
                    <div
                      style={{
                        marginTop: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        {new Date(item.bookingStartDate).getHours()}:
                        {new Date(item.bookingStartDate).getMinutes()}-
                        {new Date(item.bookingEndDate).getMinutes()}:
                        {new Date(item.bookingStartDate).getMinutes()}
                      </div>
                      <div>{getClientName(item.clientId)}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        {handle.active && (
          <div
            style={{
              backgroundColor: "#def7eb",
              height: "100vh",
            }}
          >
            <div
              style={{
                height: "10%",
                border: "1px",
                width: "30%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  paddingTop: "80px",
                  paddingLeft: "550px",
                  height: "20vh",
                  fontWeight: "600",
                  fontSize: "32px",
                }}
              >
                <time />
                {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
              </div>
            </div>
            <div
              style={{
                margin: "auto",
                alignContent: "center",
                height: "600px",
                width: "600px",
                backgroundColor: "white",
                color: "grey",
                borderRadius: "3%",
                marginTop: "50px",
              }}
            >
              <div style={{ margin: "10px", padding: "10px" }}>
                <div style={{ marginBottom: "10px", fontWeight: "600" }}>
                  Upcoming Bookings
                </div>

                {bookings
                  .filter((el) => {
                    return moment(el.bookingStartDate).isBetween(
                      moment().startOf("hour"),
                      moment().endOf("day")
                    );
                  })
                  .map((item) => (
                    <div
                      style={{
                        margin: "5px",
                        backgroundColor: "#d5eaeb",
                        borderRadius: "2%",
                        padding: "5px",
                      }}
                    >
                      <div style={{ color: "#62d49f" }}>
                        {startCase(item.status)}
                      </div>
                      <div
                        style={{
                          marginTop: "5px",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          {new Date(item.bookingStartDate).getHours()}:
                          {new Date(item.bookingStartDate).getMinutes()}-
                          {new Date(item.bookingEndDate).getMinutes()}:
                          {new Date(item.bookingStartDate).getMinutes()}
                        </div>
                        <div>{getClientName(item.clientId)}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </FullScreen>
    </div>
  );
}

export default DashboardFullScreen;
