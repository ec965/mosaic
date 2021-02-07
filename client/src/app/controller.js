import React from "react";
import { Button } from "../components/button";
import Slider from "../components/slider";

export const ToolLabel = (props) => (
  <h6 onClick={props.onClick} className={`${props.className} courier`}>
    {props.children}
  </h6>
);

/* 
slider = {
  name:,
  min,
  max,
  handleChange,
  name,
  var,
}
*/
const Controller = ({
  top,
  sliders,
  bottom,
  handleSave,
  disableSave,
  onTitleChange,
  title,
  titleError,
}) => {
  const sliderTools = sliders.map((t, i) => {
    return (
      <div key={i}>
        <ToolLabel>
          {t.name}:
          {t.percent
            ? Math.floor(((t.var - t.min) / (t.max - t.min)) * 100)
            : t.var}
          {t.percent && "%"}
        </ToolLabel>
        <Slider
          min={t.min}
          max={t.max}
          onChange={t.onChange}
          id={t.name}
          value={t.var}
        />
      </div>
    );
  });

  return (
    <div className="panel">
      <Button disabled={disableSave} onClick={handleSave} className="courier">
        Save
      </Button>
      <input
        onChange={onTitleChange}
        value={title}
        type="text"
        className="form-field"
        placeholder="Title"
        id="title"
      />
      {titleError && <span>Please enter a title.</span>}
      {top}
      {sliderTools}
      {bottom}
    </div>
  );
};

export default Controller;
