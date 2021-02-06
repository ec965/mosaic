import React from "react";

const Slider = ({className, ...props}) => {
  return (
    <input type="range" className={`${className} slider`} {...props} />
  );
};

export default Slider;
