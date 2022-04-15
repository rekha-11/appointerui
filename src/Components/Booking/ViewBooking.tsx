import React from "react";

type Props = {
  event: any;
};

export default function ViewBooking(props: Props) {
  const { event } = props;
  console.log("event", event);
  return (
    <div style={{ padding: "3%" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontWeight: "600" }}> From</div>
        <div>
          {new Date(event.start).getHours()}:
          {new Date(event.start).getMinutes()}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontWeight: "600" }}> To</div>
        <div>
          {new Date(event.end).getHours()}:{new Date(event.end).getMinutes()}
        </div>
      </div>
    </div>
  );
}
