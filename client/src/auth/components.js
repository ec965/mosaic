import React from "react";

export const FormCard = (props) => {
  return (
    <div className="form-card">
      <h3 className="form-title">{props.title}</h3>
      {props.children}
    </div>
  );
};
export const FormError = (props) => {
  return <p>{props.children}</p>;
};

export const FormLabel = (props) => (
  <label className="form-label">{props.children}</label>
);

export const FormButton = (props) => (
  <button className="form-button" type="submit" disabled={props.disabled}>
    {props.children}
  </button>
);
