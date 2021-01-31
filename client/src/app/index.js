import React, {useEffect, useState} from 'react';
import {RandomPixelSquare} from './generator';
import {Row, Column} from '../components/layout';

// props.pixel = Pixel();
const PixelDiv = (props) => {
  const style = {
    backgroundColor: props.pixel.hex,
    height:'5px',
    width:'5px',
  }
  
  return(
    <div style={style}></div>
  );
}

const PixelApp = () => {
  const [pixelMap, setPixelMap] = useState([[]]);
  
  useEffect(() => {
    setInterval(()=>{
      let data = new RandomPixelSquare(100);
      setPixelMap(data.data);
    }, 1000);
  },[])

  const render = pixelMap.map((inner,i) => {
    return(
      <Row key={i}>
        {inner.map((p,i) => <PixelDiv pixel={p} />)}
      </Row>
    );
  });

  return(
    <Column>
      {render}
    </Column>
  );
}

export default PixelApp;