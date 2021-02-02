import React, {useState} from 'react';
import PixelApp from '../app/index';
import {Column, Row} from '../components/layout';
import Toggle from '../components/toggle';
import Slider from '../components/slider';

const sliders = [
  {
    min: 1,
    max: 30,
    name:'dimensions',
    defaultValue: 10,
  },
  {
    min: 1,
    max: 40,
    name:'pixel size',
    defaultValue: 30,
  },
  {
    min: 0,
    max: 50,
    name:'border radius',
    defualtValue: 50,
  },
  {
    min: 0,
    max: 255,
    name:'rmin',
    defaultValue: 0,
  },
  {
    min: 0,
    max: 255,
    name:'rmax',
    defaultValue: 255,
  },
  {
    min: 0,
    max: 255,
    name:'gmin',
    defaultValue: 0,
  },
  {
    min: 0,
    max: 255,
    name:'gmax',
    defaultValue: 255,
  },
  {
    min: 0,
    max: 255,
    name:'bmin',
    defaultValue: 0,
  },
  {
    min: 0,
    max: 255,
    name:'bmax',
    defaultValue: 255,
  },
];

const ToolLabel = (props) => <h6 className="courier">{props.children}</h6>

const Generator = () =>{
  const [dimension, setDimension] = useState(sliders[0].defaultValue);
  const [pixelSize, setPixelSize] = useState(sliders[1].defaultValue);
  const [borderRadius, setBorderRadius] = useState(sliders[2].defaultValue);
  const [rmin, setRmin] = useState(0);
  const [rmax, setRmax] = useState(255);
  const [gmin, setGmin] = useState(0);
  const [gmax, setGmax] = useState(255);
  const [bmin, setBmin] = useState(0);
  const [bmax, setBmax] = useState(255);
  const [sortHueRow, setSortHueRow] = useState(false);
  const [sortHueRowLen, setSortHueRowLen] = useState(dimension);
  const [sortHueCol, setSortHueCol] = useState(false);
  const [sortHueColLen, setSortHueColLen] = useState(dimension);

  const handleChange = (event) => {
    switch(event.target.name){
      case 'dimensions':
        setDimension(event.target.value);
        break;
      case 'pixel size':
        setPixelSize(event.target.value);
        break;
      case 'border radius':
        setBorderRadius(event.target.value);
        break;
      case 'rmin':
        setRmin(event.target.value);
        break;
      case 'rmax':
        setRmax(event.target.value);
        break;
      case 'gmin':
        setGmin(event.target.value);
        break;
      case 'gmax':
        setGmax(event.target.value);
        break;
      case 'bmin':
        setBmin(event.target.value);
        break;
      case 'bmax':
        setBmax(event.target.value);
        break;
      case 'sortHueRowLen':
        setSortHueRowLen(event.target.value);
        break;
      case 'sortHueColLen':
        setSortHueColLen(event.target.value);
        break;
      default: 
        return;
    }  
        
  }

  const handleSave = () => {
    const data = {
      dimension: dimension,
      pixelSize: pixelSize,
      borderRadius: borderRadius,
      rmin: rmin,
      rmax: rmax,
      gmin: gmin,
      gmax: gmax,
      bmin: bmin,
      bmax: bmax,
      sortHueRow: sortHueRow,
      sortHueCol: sortHueCol,
      sortHueColLen: sortHueColLen,
      sortHueRowLen: sortHueRowLen,
    }
    // post data to DB
  }

  const handleToggle = (event) =>{
    if(event.target.name === "sortHueRow"){
      setSortHueRow(event.target.checked);
    }
    if(event.target.name === "sortHueCol"){
      setSortHueCol(event.target.checked);
    }
  }

  const sliderTools = sliders.map((t,i) => {
    return(
      <div key={i}>
        <ToolLabel>{t.name}</ToolLabel>
        <Slider
          min={t.min}
          max={t.max}
          onChange={handleChange}
          name={t.name}
          defaultValue={t.defaultValue}
        />
      </div>
    );
  })

  return(
    <div className="generator">
      <div className='panel'>
        {sliderTools}
        <ToolLabel>sort hue by rows</ToolLabel>
        <Toggle onClick={handleToggle} name='sortHueRow'/>
        <ToolLabel>sort length</ToolLabel>
        <Slider
          min={0}
          max={dimension}
          onChange={handleChange}
          name="sortHueRowLen"
          defaultValue={dimension}
        />
        <ToolLabel>sort hue by columns</ToolLabel>
        <Toggle onClick={handleToggle} name='sortHueCol'/>
        <ToolLabel>sort length</ToolLabel>
        <Slider
          min={0}
          max={dimension}
          onChange={handleChange}
          name="sortHueColLen"
          defaultValue={dimension}
        />
      </div>
      <div className='editor'>
        <PixelApp
          dimension={dimension}
          pixelSize={pixelSize}
          borderRadius={borderRadius}
          rmin={rmin}
          rmax={rmax}
          gmin={gmin}
          gmax={gmax}
          bmin={bmin}
          bmax={bmax}
          sortHueRow={sortHueRow}
          sortHueCol={sortHueCol}
          sortHueRowLen={sortHueRowLen}
          sortHueColLen={sortHueColLen}
        />
      </div>
    </div>
  );
}

export default Generator;