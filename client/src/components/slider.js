import React from 'react';

const Slider = (props) => {

  return(
    <input 
      type="range" 
      min={props.min} 
      max={props.max} 
      value={props.value} 
      defaultValue={props.defaultValue}
      className={`${props.className} slider`}
      onChange={props.onChange}
      name={props.name}
    />
  );
}

export default Slider;