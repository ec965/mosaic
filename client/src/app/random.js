import React, {useEffect, useState} from 'react';
import {RandomPixelSquare} from './generator';
import PixelApp from './app.js';

const RandomGenerator = (props) => {
  const [pixelMap, setPixelMap] = useState([[]]);

  useEffect(() => {
    if(!props.data){
      let data = new RandomPixelSquare(props.dimension, props.rmin, props.rmax, props.gmin, props.gmax, props.bmin, props.bmax);
      if (props.sortHueCol){
        data.sortHueVertical(props.sortHueColLen);
      }
      if (props.sortHueRow){
        data.sortHue(props.sortHueRowLen);
      }
      setPixelMap(data.data)
    }
    else {
      setPixelMap(props.data);
    }
  },[
    props.data, 
    props.sortHueRowLen, 
    props.sortHueColLen, 
    props.sortHueCol, 
    props.sortHueRow, 
    props.rmin, 
    props.rmax, 
    props.gmin, 
    props.gmax, 
    props.bmin, 
    props.bmax, 
    props.dimension
  ]);

  return(
    <PixelApp
      pixelMap={pixelMap}
      pixelSize={props.pixelSize}
      borderRadius={props.borderRadius}
      grid={props.grid}
      backgroundColor={props.backgroundColor}
    />
  );
}

RandomGenerator.defaultProps={
  dimension:30,
  pixelSize: 10,
  borderRadius: 25,
  rmin: 0,
  rmax: 255,
  gmin: 0,
  gmax: 255,
  bmin: 0,
  bmax: 255,
  sortHueRow: false,
  sortHueCol: false,
  sortHueRowLen: -1,
  sortHueColLen: -1,
  grid: false,
  backgroundColor: null,
}

export default RandomGenerator;