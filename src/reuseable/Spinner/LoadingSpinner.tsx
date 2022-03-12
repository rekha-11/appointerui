// For more spinner please follow this link https://larainfo.com/blogs/tailwind-css-loading-spinner-example

import React from "react";

interface SpinnerProps {}

const LoadingSpinner: React.FC<SpinnerProps> = (props) => {
  return (
    <div
      style={{ borderTopColor: "transparent" }}
      className={
        "w-10 h-10 border-4 border-current border-double rounded-full animate-spin m-auto"
      }
    ></div>
  );
};

export default LoadingSpinner;
