import React from "react";
import { Button } from "../components/button";
import Slider from "../components/slider";
import Loader from 'react-loader-spinner';
import { COLORS } from '../config/colors';
import { Row } from '../components/layout';

export const ToolLabel = (props) => (
  <h6 onClick={props.onClick} className={`${props.className} courier`}>
    {props.children}
  </h6>
);

export const ToolBox = (props) => {
  return(
    <div className="tool-box">
      {props.children}
    </div>
  );
}

export const ToolSlider = ({name, id, percent, value, min, max, onChange}) => {
  return(
    <>
      <ToolLabel>
        {name}:
        {percent
          ? Math.floor(((value - min) / (max - min)) * 100)
          : value}
        {percent && "%"}
      </ToolLabel>
      <Slider
        min={min}
        max={max}
        onChange={onChange}
        id={id ? id : name}
        value={value}
      />
    </>
  );
}

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
      <ToolBox key={i}>
        <ToolSlider
          name={t.name}
          percent={t.percent}
          min={t.min}
          max={t.max}
          onChange={t.onChange}
          value={t.var}
        />
      </ToolBox>
    );
  });

  return (
    <div className="panel">
      <Row className="flex-start">
        <Button disabled={disableSave} onClick={handleSave} className="courier">
          Save
        </Button>
        {disableSave && 
          <Loader className="controller-loader" type="Oval" color={COLORS.base0D} height={20} width={20}/>
        }
      </Row>
      <div>
        <input
          onChange={onTitleChange}
          value={title}
          type="text"
          className="form-field"
          placeholder="Title"
          id="title"
        />
        {titleError && <span className="red-text">Please enter a title.</span>}
      </div>
      {top}
      <div>
        {sliderTools}
      </div>
      {bottom}
    </div>
  );
};

export default Controller;
