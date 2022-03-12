import React from "react";
import Loadable from "react-loadable";
import LoadingSpinner from "../../reuseable/Spinner/LoadingSpinner";

const CalendarComponent = Loadable({
  loader: () => import("../../Components/Clanedar/Calendar"),
  loading: LoadingSpinner,
});

export default function CalendarPage() {
  return (
    <div>
      <CalendarComponent />
    </div>
  );
}
