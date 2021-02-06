import React from "react";
const TextBoxForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <textarea maxLength={props.maxLength} {...props}></textarea>
      <input type="submit" value="Submit" />
      <p>
        {props.value.length}/{props.maxLength}
      </p>
    </form>
  );
};
export default TextBoxForm;
