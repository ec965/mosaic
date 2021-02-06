import React from "react";

const Toggle = ({className, ...props}) => {
  return (
    <label className={"toggle " + className}>
      <input type="checkbox" {...props} />
      <span className="toggle-slider"></span>
    </label>
  );
};
export default Toggle;
