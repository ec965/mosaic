import React from 'react';
const TextBoxForm = (props) => {

  return(
    <form onSubmit={props.onSubmit}>
      <textarea 
        maxLength={props.maxLength} 
        name={props.name} 
        className={`${props.className}`}
        value={props.value}
        onChange={props.onChange}
        rows={props.rows}
        cols={props.cols}
      >
      </textarea>
      <input type="submit" value="Submit"/> 
      <p>{props.value.length}/{props.maxLength}</p>
    </form>
  );
}
export default TextBoxForm;