import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Card } from "@mui/material";

const localizer = momentLocalizer(moment);

const myEventsList: any = [];

export default function BigCalendar() {
  return (
    <div>
      <Card
        style={{
          height: "80vh",
          width: "100%",
          margin: "auto",
          padding: "10px",
        }}
      >
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          selectable
        />
      </Card>
    </div>
  );
}
