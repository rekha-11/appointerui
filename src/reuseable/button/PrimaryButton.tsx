import React from "react";
import ClassName from "../../utils/ClassName";

interface IButtonProps {
  text: string | React.ReactNode;
  type?: any;
  buttonType?: string;

  [other: string]: unknown;
}

const PrimaryButton: React.FC<IButtonProps> = (props) => {
  const { text, type = "submit", buttonType = "primary", ...other } = props;
  return (
    <button
      className={ClassName(
        buttonType === "primary"
          ? "bg-current hover:bg-current text-white font-bold py-2 px-2 rounded shadow-lg hover:shadow-xl transition duration-200 text-center"
          : "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-2 rounded shadow-lg hover:shadow-xl transition duration-200 text-center"
      )}
      style={{ minWidth: "100px" }}
      type={type}
      {...other}
    >
      {text}
    </button>
  );
};
export default PrimaryButton;
