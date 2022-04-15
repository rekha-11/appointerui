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
  Typography,
} from "@mui/material";
import BookingForm from "../Components/Booking/BookingForm";
import PrimaryButton from "./button/PrimaryButton";
import ReactToPrint from "react-to-print";
import PrintLayout from "./PrintLayout";
import ViewBooking from "../Components/Booking/ViewBooking";

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
    end: new Date(booking.bookingEndDate),
  }));
};

type Props = {
  selectable: boolean;
  sp: any;
};

function App(props: Props) {
  const { selectable, sp } = props;
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  const componentRef: any = React.useRef();

  const bookings = useAppSelector((state) => state.booking.bookings);
  const dispatch = useAppDispatch();
  const companyId = useAppSelector((state) => state.user.companyId);

  const filteredBookings = bookings.filter((item: any) => item.spId === sp.sp);

  const [open, setOpen] = React.useState(false);
  const [currentData, setCurrentData] = React.useState({});
  const [viewEvent, setViewEvent] = React.useState(false);
  const [event, setEvent]: any = React.useState({});

  const handleEventSelect = (event: any) => {
    setViewEvent(true);
    setEvent(event);
  };
  return (
    <div
      style={{
        height: "700px",
        width: "100%",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <div>
          <ReactToPrint
            trigger={() => <PrimaryButton text={"Print"} />}
            content={() => componentRef.current}
          />
          <div style={{ display: "none" }}>
            <PrintLayout
              ref={componentRef}
              bookings={filteredBookings}
              sp={sp}
            />
          </div>
        </div>
      </div>
      {/* calendar module */}
      <Calendar
        view={"week"}
        localizer={localizer}
        events={formatBookingsToCalendarEvents(filteredBookings)}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleEventSelect}
        step={20}
        // onView="week"
        selectable={selectable}
        // min={new Date(year, month, day, 9, 0, 0)}
        // max={new Date(year, month, day, 18, 0, 0)}
        onSelectSlot={({ end, start }) => {
          setOpen(true);
          setCurrentData({
            bookingEndDate: end,
            bookingStartDate: start,
          });
        }}
        timeslots={3}
      />

      {/* create event dialogue */}
      <Dialog
        open={open}
        fullWidth
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create Booking</DialogTitle>
        <DialogContent>
          <BookingForm
            currentData={currentData}
            sp={sp}
            handleClose={setOpen}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={viewEvent}
        fullWidth
        onClose={() => setViewEvent(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">{event.title}</DialogTitle>
        <ViewBooking event={event} />
      </Dialog>
    </div>
  );
}

export default App;
