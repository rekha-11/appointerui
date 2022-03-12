import React from "react";

interface ICardProps {
  title: string;
  children?: React.ReactNode;
}

const Card: React.FC<ICardProps> = (props) => {
  const { title, children } = props;
  return (
    <div className="rounded-md bg-red">
      <div>
        <header className="text-2xl capitalize">{title}</header>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
      </div>
      <div className="p-8">{children}</div>
    </div>
  );
};

export default Card;
