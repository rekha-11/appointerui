import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const getEndDate = (date: Date) => {
  let newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + 30);
  return newDate;
};

function App() {
  // const new_events = r_events.all()?.map((value, index) => ({
  //   id: index,
  //   title: "Science",
  //   allDay: false,
  //   start: value,
  //   end: getEndDate(value),
  //   resourceId: index + 1
  // }));

  return (
    <div
      style={{
        height: "700px",
        width: "800px",
        margin: "auto",
        marginTop: "5%"
      }}
    >
      <Calendar
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={(sI) => console.log(sI)}
        timeslots={3}
      />
    </div>
  );
}

export default App;
