import React from "react";

export const Column = ({className, ...props}) => {
  return (
    <div className={className + " col"} {...props}>
      {props.children}
    </div>
  );
};
export const Row = ({className, ...props}) => {
  return (
    <div className={className + " row"} {...props}>
      {props.children}
    </div>
  );
};

export const Page = ({className, ...props}) => {
  return (
    <div className={className + " page"} {...props}>
      {props.children}
    </div>
  );
};
