import React from "react";

interface IDividerProps {}

const Divider: React.FC<IDividerProps> = (props) => {
  const {} = props;
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
    </div>
  );
};

export default Divider;
