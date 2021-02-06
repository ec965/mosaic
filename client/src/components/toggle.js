import React from "react";

const Toggle = (props) => {
  return (
    <label className={"toggle " + props.className}>
      <input type="checkbox" {...props} />
      <span className="toggle-slider"></span>
    </label>
  );
};
export default Toggle;
