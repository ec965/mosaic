import React from 'react';

const Toggle = (props) => {
  return(
    <label className={"toggle " + props.className}>
      <input 
        type="checkbox" 
        onChange={props.onChange} 
        name={props.name} 
        checked={props.checked} 
        id={props.id}
      />
      <span className="toggle-slider"></span>
    </label>
  );
}
export default Toggle;