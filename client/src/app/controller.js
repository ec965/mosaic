import React from 'react'
import Slider from '../components/slider';

const ToolLabel = (props) => <h6 onClick={props.onClick} className={`${props.className} courier`}>{props.children}</h6>

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
const Controller = ({top, sliders, bottom}) => {

  const sliderTools = sliders.map((t,i) => {
    return(
      <div key={i}>
        <ToolLabel>{t.name}:{t.var}</ToolLabel>
        <Slider
          min={t.min}
          max={t.max}
          onChange={t.onChange}
          id={t.name}
          value={t.var}
        />
      </div>
    );
  })

  return (
    <div className="panel">
      {top}
      {sliderTools}
      {bottom}
    </div>
  )
}

export default Controller
