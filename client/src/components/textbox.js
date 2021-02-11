import React from "react";
const TextBoxForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <textarea maxLength={props.maxLength} {...props}></textarea>
      <div className="row space-between textbox-items">
        <input
          className="textbox-submit courier"
          type="submit"
          value="Submit"
        />
        <p>
          {props.value.length}/{props.maxLength}
        </p>
      </div>
    </form>
  );
};
export default TextBoxForm;
