import React from 'react';

const Toggle = (props) => {
  return(
    <label className={"toggle " + props.className}>
      <input type="checkbox" onClick={props.onClick} name={props.name} checked={props.checked}/>
      <span className="toggle-slider"></span>
    </label>
  );
}
export default Toggle;