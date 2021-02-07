import React, { useRef, useEffect, useState, useReducer } from "react";
import Controller, { ToolLabel } from './controller';
import { Page } from '../components/layout';
import { PixelApp } from "./app";
import { SliderPicker } from 'react-color';
import Toggle from "../components/toggle";
import { Button } from "../components/button";
import { randInt, redirect } from '../util/util';
import { postAppNew } from "../config/api";
import { useQuery } from 'react-query';

const MAXLENGTH = 900; // this isn't exact but it's pretty close
const MINLENGTH = 4;
// sqrt(length of original / max length of pixelated) =  min scale

// to limit the pixel density of the output:
// 1. image is uploaded, dispatch updates state.imgSrc
// 2. when state.imgSrc is updated, it triggeres a useEffect which reloads the image canvas data
// 3. at the end of that useEffect, state.scale is set to minScale

function pixelizeImage(data, width, height, sampleSize) {
  let arr = [];
  for (let y = 0; y < height; y += sampleSize) {
    let subarr = [];
    for (let x = 0; x < width; x += sampleSize) {
      let index = (x + y * width) * 4;
      let pixel = {
        r: data[index],
        g: data[index + 1],
        b: data[index + 2],
      };
    
      subarr.push(pixel);
    }
    arr.push(subarr);
  }
  console.log('data length:', data.length/4, 'output length:', arr.length * arr[0].length);
  return arr;
}

const ACTION = {
  IMGSRC: 'imgSrc',
  BORDERRADIUS: 'borderRadius',
  PIXELSIZE: 'pixelSize',
  SCALE: 'scale',
  GRID: 'grid'  ,
  BGCOLOR:'backgroundColor',
  TITLE: 'title',
  TITLEERROR: 'titleError',
  RANDOM: 'random',
  NEWSCALE: 'newScale',
  RESET: 'reset',
}

function reducer(state, action){
  switch(action.type){
    case ACTION.IMGSRC:
      return {...state, imgSrc: action.payload};
    case ACTION.BORDERRADIUS: 
      return {...state, borderRadius: action.payload};
    case ACTION.SCALE:
      return {...state, scale: action.payload};
    case ACTION.NEWSCALE:
      return {
        ...state, 
        scale: action.payload.minScale,
        minScale: action.payload.minScale,
        maxScale: action.payload.maxScale
      };
    case ACTION.PIXELSIZE:
      return {...state, pixelSize: action.payload};
    case ACTION.BGCOLOR:
      return {...state, backgroundColor: action.payload};
    case ACTION.GRID:
      return { ...state, grid: action.payload };
    case ACTION.RANDOM:
      return {
        ...state,
        borderRadius: randInt(minMax.borderRadius.min, minMax.borderRadius.max),
        grid: randInt(0, 1),
        backgroundColor: `rgb(${randInt(0, 255)}, ${randInt(0, 255)}, ${randInt(0, 255)})`,
        scale: randInt(state.minScale, state.maxScale)
      }
    case ACTION.TITLE:
      let titleError = false;
      if (action.payload.trim().length === 0){
        titleError = true;
      }
      return {
        ...state, 
        title: action.payload,
        titleError: titleError
      };
    case ACTION.TITLEERROR: 
      return {...state, titleError: action.payload};
    case ACTION.RESET:
      // reset everything except for scale and imgSrc
      return {
        ...initialState,
        scale: state.minScale,
        minScale: state.minScale,
        maxScale: state.maxScale,
        imgSrc: state.imgSrc
      }
    default:
      return state;
  }
}

const minMax = {
  borderRadius: {
    min: 0,
    max: 50,
  },
  scale: {
    min: 30,
    max:100,
  },
  pixelSize: {
    min:280,
    max: 720
  }
}

const initialState = {
  imgSrc: null,
  borderRadius: 0,
  pixelSize: 360,
  scale: 100,
  grid: false,
  backgroundColor: '#fff',
  title: '',
  titleError: false,
  minScale: 0,
  maxScale: 100,
};

const ImageGenerator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const canvasRef = useRef(null);
  const [pixelMap, setPixelMap] = useState([[]]);
  const [imgData, setImgData] = useState(null);
  const [disableSave, setDisableSave] = useState(false);
  
  // editing goes to the RandomGenerator component
  // RandomGenerator is generic enough to provide editing tools for both images and random boxes

  // load the image data
  useEffect(() => {
    function loadImage(){
      let img = new Image();
      img.src = state.imgSrc

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      img.onload = function () {
        setDimension({ width: this.width, height: this.height });

        ctx.drawImage(img, 0, 0);
        img.style.display = "none";

        let ctxImgData = ctx.getImageData(0, 0, this.width, this.height);

        // used for setting min scale
        // divide for 4 for number of pixels
        // every 4 values representas a pixel (r,g,b,a)
        let minScale = Math.floor(Math.sqrt((ctxImgData.data.length/4) / MAXLENGTH));
        let maxScale = Math.floor(Math.sqrt(ctxImgData.data.length/4)/ MINLENGTH);
        // when loading a new picture, set scale to min
        dispatch({type: ACTION.NEWSCALE, payload: {minScale:minScale, maxScale:maxScale }});

        setImgData(ctxImgData);
      }
    }

    loadImage();
  }, [state.imgSrc]);

  // edit the image
  useEffect(() => {
    function editPixMap(){
      if (!imgData) return;

      let imgarr = pixelizeImage(
        imgData.data,
        imgData.width,
        imgData.height,
        state.scale
      );
      setPixelMap(imgarr);
    }

    editPixMap();
  }, [state.scale, imgData ]);

  const sliders = [
    {
      var: state.borderRadius,
      name: 'border radius',
      defaultValue: initialState.borderRadius,
      min: minMax.borderRadius.min,
      max: minMax.borderRadius.max,
      onChange: (e) => {
        dispatch({ type: ACTION.BORDERRADIUS, payload: parseInt(e.target.value)})
      },
      percent: true,
    },{
      var: state.scale,
      name: 'pixel scale',
      defaultValue: state.minScale,
      min: state.minScale,
      max: state.maxScale,
      onChange: (e) => dispatch({ type: ACTION.SCALE, payload: parseInt(e.target.value)}),
      percent: true,
    },{
      var: state.pixelSize,
      name: 'zoom',
      defaultValue: initialState.pixelSize,
      min: minMax.pixelSize.min,
      max: minMax.pixelSize.max,
      onChange: (e) => dispatch({ type: ACTION.PIXELSIZE, payload: parseInt(e.target.value)}),
      percent: true,
    }
  ]

  const handleSave = () => {
    setDisableSave(true);
    if(state.title.trim().length === 0){
      dispatch({type: ACTION.TITLEERROR, payload: true});
    }
    
    let data = {
      title: state.title.trim(),
      project: {
        pixelMap: pixelMap,
        borderRadius: state.borderRadius,
        grid: state.grid,
        backgroundColor: state.backgroundColor,
      },
    };
    
    postAppNew(data)
    .then((res) => redirect(`/project/${res.data}`)) 
    .then((err) => console.error(err));

    setDisableSave(false);
  }

  // I want the canvas to be invisible
  return (
    <Page className="generator">
      <Controller
        disableSave={disableSave}
        handleSave={handleSave}
        title={state.title}
        titleError={state.titleError}
        onTitleChange={(e) => dispatch({type: ACTION.TITLE, payload: e.target.value})}
        sliders={sliders}
        top={
          <>
            <Button
              onClick={(e) => {
                dispatch({type: ACTION.RANDOM})
              }}
            >
              Random
            </Button>
          </>
        }
        bottom={
          <>
            <ToolLabel>grid lines</ToolLabel>
            <Toggle
              onChange={(e) =>
                dispatch({ type: ACTION.GRID, payload: e.target.checked })
              }
              checked={state.grid}
            />
            <SliderPicker
              color={state.backgroundColor}
              onChangeComplete={(color, e) =>
                dispatch({ type: ACTION.BGCOLOR, payload: color.hex })
              }
            />
            <Button
              onClick={(e) => {dispatch({ type: ACTION.RESET })}}
              className="courier red"
            >
              Reset
            </Button>
          </>
        }
      />
      <input 
        type="file" 
        accept="image/*" 
        onChange={ (e) => 
          dispatch({type: ACTION.IMGSRC, payload: URL.createObjectURL(e.target.files[0])}) }
      />
      <PixelApp
        pixelMap={pixelMap}
        borderRadius={state.borderRadius}
        pixelSize={
          state.grid 
          ? state.pixelSize/pixelMap.length - 2 
          : state.pixelSize/pixelMap.length
        }
        grid={state.grid}
        backgroundColor={state.backgroundColor}
      />
      <canvas
        style={{
          position: "absolute",
          zIndex: -1,
          height: 0,
          width: 0,
        }}
        width={dimension.width}
        height={dimension.height}
        ref={canvasRef}
      />
    </Page>
  );
};

export default ImageGenerator;