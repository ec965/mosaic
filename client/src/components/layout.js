import React from 'react';

export const Column = (props) => {
  return(
    <div className={props.className + " col"} {...props}>{props.children}</div>
  );
} 
export const Row = (props) => {
  return(
    <div className={props.className + " row"} {...props}>{props.children}</div>
  );
} 

export const Page = (props) => {
  return(
    <div className={props.className + " page"} {...props}>{props.children}</div>
  );
}