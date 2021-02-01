import React from 'react';

export const Button = (props) => {
  return(
    <button type="button" className={props.className} onClick={props.onClick} onSubmit={props.onSubmit}>
      {props.children}
    </button>
  );
}
export const ButtonLink = (props) => {
  const handleClick = () => {
    window.open(props.link);
  }
  return(
    <button type="button" className={props.className} onClick={props.link ? handleClick : props.onClick}>
      {props.children}
    </button>
  );
}