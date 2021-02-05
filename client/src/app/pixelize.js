import React, {useRef, useEffect, useState} from 'react';
import {PixelApp} from './index';

function imgArray(data, width, height, sampleSize){
  console.log('total:', data.length, 'width:', width, 'height:', height);
  console.log('wxhx4',width*height*4);
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

// function compressImg (arr){

// }

const Canvas = () => {
  const [dimension, setDimension] = useState({width:window.innerWidth, height: window.innerHeight})
  const canvasRef = useRef(null);
  const [pixelMap, setPixelMap] = useState([[]]);
  const size = 720;

  useEffect(() => {
    var img = new Image();
    img.src = './test.png';

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    img.onload = function(){
      setDimension({width:this.width, height: this.height});

      ctx.drawImage(img,0,0);
      img.style.display='none';
      
      let imgData = ctx.getImageData(0,0,this.width,this.height);

      let imgarr = imgArray(imgData.data, imgData.width, imgData.height, 16);
      console.log(imgarr);
      setPixelMap(imgarr);
    }
  },[])


  return(
    <div>
    <canvas
      width={dimension.width}
      height={dimension.height}
      ref={canvasRef}
    />
    <PixelApp
      pixelMap={pixelMap}
      borderRadius={0}
      pixelSize={12}
    />
    </div>
  );
}

export default Canvas;