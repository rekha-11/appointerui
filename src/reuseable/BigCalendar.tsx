import * as React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Booking, postBooking } from "../slices/bookingSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography
} from "@mui/material";

const localizer = momentLocalizer(moment);

const getEndDate = (date: Date) => {
  let newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + 30);
  return newDate;
};

interface CalEvent {
  title: string;
  allDay: false;
  start: Date;
  end: Date;
}

const formatBookingsToCalendarEvents = (
  bookings: Array<Booking>
): Array<CalEvent> => {
  return bookings.map((booking, i) => ({
    title: booking.description,
    allDay: false,
    start: new Date(booking.bookingStartDate),
    end: new Date(booking.bookingEndDate)
  }));
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

  const bookings = useAppSelector((state) => state.booking.bookings);

  const dispatch = useAppDispatch();
  const companyId = useAppSelector((state) => state.user.companyId);

  const [open, setOpen] = React.useState(false);
  const [currentData, setCurrentData] = React.useState<Booking>({
    companyId,
    description: ""
  } as Booking);

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
        events={formatBookingsToCalendarEvents(bookings)}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={({ end, start }) => {
          setOpen(true);
          setCurrentData((p) => ({
            ...p,
            bookingEndDate: end,
            bookingStartDate: start
          }));
        }}
        timeslots={3}
      />
      <Dialog
        open={open}
        fullWidth
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create Booking</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            label="Title"
            value={currentData.description}
            fullWidth
            onChange={(e) =>
              setCurrentData((p) => ({ ...p, description: e.target.value }))
            }
          />
          <Typography>
            Booking Start Time:{" "}
            {moment(currentData.bookingStartDate).format("YYYY-MM-DD")}
          </Typography>
          <Typography>
            Booking End time:{" "}
            {moment(currentData.bookingEndDate).format("YYYY-MM-DD")}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch(postBooking(currentData));
              setOpen(false);
              setCurrentData({
                companyId,
                description: ""
              } as Booking);
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
