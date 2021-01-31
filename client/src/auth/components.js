import React from 'react';

export const FormCard = (props) => {
  return(
    <div>
      <h1>{props.title}</h1>
      {props.children}
    </div>
  )
}
export const FormError = (props) => {
  return(
    <p>{props.children}</p>
  )
}