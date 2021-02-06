import React from "react";

export const Button = ({ children, ...props }) => {
  return (
    <button {...props} type="button">
      {children}
    </button>
  );
};
export const ButtonLink = ({ link, onClick, children, ...props }) => {
  const handleClick = () => {
    window.open(link);
  };
  return (
    <button type="button" {...props} onClick={link ? handleClick : onClick}>
      {children}
    </button>
  );
};
