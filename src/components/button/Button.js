import React from "react";

const Button = ({
  onClick,
  type = "button",
  bgColor = "primary",
  full = false,
  className = "",
  children,
  ...props
}) => {
  let bgClassName = "bg-primary";

  switch (bgColor) {
    case "primary":
      bgClassName = "bg-primary";
      break;
    case "secondary":
      bgClassName = "bg-secondary";
      break;

    default:
      break;
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        full ? "w-full" : ""
      } px-6  py-3 mt-auto capitalize rounded-lg md:px-3 md:text-xs md:py-2 ${bgClassName} ${className}`}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
