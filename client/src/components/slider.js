import React from "react";

const Slider = (props) => {
  return (
    <input type="range" className={`${props.className} slider`} {...props} />
  );
};

export default Slider;
