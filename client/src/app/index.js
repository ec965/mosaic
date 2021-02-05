import React, {useEffect, useState} from 'react';
import {RandomPixelSquare} from './generator';
import {Row, Column} from '../components/layout';

// parameters to tweak
// border radius
// RGB min and max
// sort length
// sort direction
// sort based on hue, saturation, or lightness
// pixel dims

// props.pixel = Pixel();
const PixelDiv = (props) => {
  const style = {
    backgroundColor: `rgb(${props.pixel.r}, ${props.pixel.g}, ${props.pixel.b}`,
    // backgroundColor: props.pixel.hex,
    height:`${props.pixelSize}px`,
    width:`${props.pixelSize}px`,
    borderRadius: `${props.borderRadius}%`,
  }
  
  return(
    <div style={style}></div>
  );
}

const PixelApp = (props) => {
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
  },[props.data, props.sortHueRowLen, props.sortHueColLen, props.sortHueCol, props.sortHueRow, props.rmin, props.rmax, props.gmin, props.gmax, props.bmin, props.bmax, props.dimension])

  const render = pixelMap.map((inner,i) => {
    return(
      <Row key={i}>
        {inner.map((p,j) => <PixelDiv key={j} pixel={p} pixelSize={props.pixelDensity/props.dimension} borderRadius={props.borderRadius}/>)}
      </Row>
    );
  });

  return(
    <Column className={props.className}>
      {render}
    </Column>
  );
}
PixelApp.defaultProps={
  dimension:30,
  pixelDensity: 300,
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
}

export default PixelApp;