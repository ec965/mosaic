import React from 'react';

export const Button = (props) => {
  return(
    <button 
      {...props}
      type="button" 
    >
      {props.children}
    </button>
  );
}
export const ButtonLink = (props) => {
  const handleClick = () => {
    window.open(props.link);
  }
  return(
    <button type="button" {...props} onClick={props.link ? handleClick : props.onClick}>
      {props.children}
    </button>
  );
}