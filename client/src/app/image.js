import React, {useRef, useEffect, useState} from 'react';
import {PixelApp} from './app';

function pixelizeImage(data, width, height, sampleSize){
  let arr = []
  for(let y=0; y<height; y+=sampleSize){
    let subarr = [];
    for(let x=0; x<width; x+=sampleSize){
      let index = (x+(y*width)) * 4;
      let pixel={
        r:data[index],
        g:data[index+1],
        b:data[index+2],
        index: index,
        // a:data[x+y+3]
      }
      subarr.push(pixel);
    }
    arr.push(subarr);
  }
  return arr;
}


const ImageGenerator = ({imgSrc, borderRadius, pixelSize, scale, grid, backgroundColor}) => {
  const [dimension, setDimension] = useState({width:window.innerWidth, height: window.innerHeight})
  const canvasRef = useRef(null);
  const [pixelMap, setPixelMap] = useState([[]]);

  useEffect(() => {
    var img = new Image();
    img.src = imgSrc;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    img.onload = function(){
      setDimension({width:this.width, height: this.height});

      ctx.drawImage(img,0,0);
      img.style.display='none';
      
      let imgData = ctx.getImageData(0,0,this.width,this.height);

      let imgarr = pixelizeImage(imgData.data, imgData.width, imgData.height, scale);
      setPixelMap(imgarr);
    }
  },[imgSrc, scale])


  // I want the canvas to be invisible
  return(
    <>
    <canvas
      style={{
        'opacity': 0,
        'position': 'absolute',
        'zIndex': -1,
        'height':0,
        'width':0,
      }}
      width={dimension.width}
      height={dimension.height}
      ref={canvasRef}
    />
    <PixelApp
      pixelMap={pixelMap}
      borderRadius={borderRadius}
      pixelSize={pixelSize}
      grid={grid}
      backgroundColor={backgroundColor}
    />
    </>
  );
}

ImageGenerator.defaultProps={
  imgSrc: './test1.png',
  borderRadius: 0,
  pixelSize: 10,
  scale:16,
  grid: false,
  backgroundColor: null,
}

export default ImageGenerator;