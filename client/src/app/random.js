import React, { useEffect, useState, useReducer } from "react";
import { HuePicker } from 'react-color';
import { Button } from '../components/button';
import { Page } from "../components/layout";
import { RandomPixelSquare } from "./generator";
import PixelApp from "./app.js";
import Controller, { ToolLabel } from "./controller";
import Toggle from '../components/toggle';
import Slider from '../components/slider';
import { postAppNew } from "../config/api";

const ACTION = {
  DIMENSION: "dimension",
  PIXELSIZE: "pixelSize",
  BORDERRADIUS: "borderRadius",
  RMIN: "rmin",
  RMAX: "rmax",
  GMIN: "gmin",
  GMAX: "gmax",
  BMIN: "bmin",
  BMAX: "bmax",
  SORTHUEROW: "sortHueRow",
  SORTHUECOL: "sortHueCol",
  SORTHUEROWLEN: "sortHueRowLen",
  SORTHUECOLLEN: "sortHueColLen",
  GRID: 'grid',
  BGCOLOR: 'backgroundColor',
  RESET: "reset",
  RANDOM: "random",
  TITLE: 'title',
};

function reducer(state, action) {
  function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  switch (action.type) {
    case ACTION.BGCOLOR:
      return {...state, backgroundColor: action.payload};
    case ACTION.DIMENSION:
      return { ...state, dimension: action.payload };
    case ACTION.PIXELSIZE:
      return { ...state, pixelSize: action.payload };
    case ACTION.BORDERRADIUS:
      return { ...state, borderRadius: action.payload };
    case ACTION.RMAX:
      return { ...state, rmax: action.payload };
    case ACTION.RMIN:
      return { ...state, rmin: action.payload };
    case ACTION.GMIN:
      return { ...state, gmin: action.payload };
    case ACTION.GMAX:
      return { ...state, gmax: action.payload };
    case ACTION.BMIN:
      return { ...state, bmin: action.payload };
    case ACTION.BMAX:
      return { ...state, bmax: action.payload };
    case ACTION.SORTHUEROW:
      return {...state, sortHueRow: action.payload};
    case ACTION.SORTHUEROWLEN:
      return {...state, sortHueRowLen: action.payload};
    case ACTION.SORTHUECOL:
      return {...state, sortHueCol: action.payload};
    case ACTION.SORTHUECOLLEN:
      return {...state, sortHueColLen: action.payload};
    case ACTION.GRID:
      return {...state, grid: action.payload};
    case ACTION.TITLE:
      return {...state, title:action.payload};
    case ACTION.RESET:
      return initialState;
    case ACTION.RANDOM:
      return {
        dimension: randInt(minMax.dimension.min, minMax.dimension.max),
        pixelSize: randInt(minMax.pixelSize.min, minMax.pixelSize.max),
        borderRadius: randInt(minMax.borderRadius.min, minMax.borderRadius.max),
        rmin: randInt(minMax.rgb.min, state.rmax),
        rmax: randInt(state.rmin, minMax.rgb.max),
        gmin: randInt(minMax.rgb.min, state.gmax),
        gmax: randInt(state.gmin, minMax.rgb.max),
        bmin: randInt(minMax.rgb.min, state.bmax),
        bmax: randInt(state.bmin, minMax.rgb.max),
        sortHueRow: randInt(0,1),
        sortHueCol: randInt(0,1),
        sortHueRowLen: -1,
        sortHueColLen: -1,
        grid: randInt(0,1),
        backgroundColor: `rgb(${randInt(0,255)}, ${randInt(0,255)}, ${randInt(0,255)}`,
      }
    default:
      return state;
  }
}

const initialState = {
  dimension: 30,
  pixelSize: 360,
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
  backgroundColor: '#fff',
  title: '',
};

const minMax = {
  dimension: {
    min: 1,
    max: 30,
  },
  pixelSize:{
    min: 280,
    max: 720
  },
  borderRadius:{
    min:0,
    max:50
  },
  rgb:{
    min:0,
    max:255
  }
}

const RandomGenerator = (props) => {
  const [pixelMap, setPixelMap] = useState([[]]);
  const [disableSave, setDisableSave] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const sliders = [
    {
      min: minMax.dimension.min,
      max: minMax.dimension.max,
      name: "pixel density",
      defaultValue: initialState.dimension,
      var: state.dimension,
      onChange: (e) => {
        dispatch({ type: ACTION.DIMENSION, payload: e.target.value });
      },
      percent: true,
    },
    {
      min: minMax.pixelSize.min,
      max: minMax.pixelSize.max,
      name: "zoom",
      defaultValue: initialState.pixelSize,
      var: state.pixelSize,
      onChange: (e) =>
        dispatch({ type: ACTION.PIXELSIZE, payload: e.target.value }),
      percent: true,
    },
    {
      min: minMax.borderRadius.min,
      max: minMax.borderRadius.max,
      name: "border radius",
      defaultValue: initialState.borderRadius,
      var: state.borderRadius,
      onChange: (e) =>
        dispatch({ type: ACTION.BORDERRADIUS, payload: e.target.value }),
      percent: true
    },
    {
      var: state.rmin,
      name: "R min",
      defaultValue: initialState.rmin,
      min: minMax.rgb.min,
      max: state.rmax,
      onChange: (e) => dispatch({ type: ACTION.RMIN, payload: e.target.value }),
    },
    {
      var: state.rmax,
      name: "R max",
      defaultValue: initialState.rmax,
      min: state.rmin,
      max: minMax.rgb.max,
      onChange: (e) => dispatch({ type: ACTION.RMAX, payload: e.target.value }),
    },
    {
      var: state.gmin,
      name: "G min",
      defaultValue: initialState.gmin,
      min: minMax.rgb.min,
      max: state.gmax,
      onChange: (e) => dispatch({ type: ACTION.GMIN, payload: e.target.value }),
    },
    {
      var: state.gmax,
      name: "G max",
      defaultValue: initialState.gmax,
      min: state.gmin,
      max: minMax.rgb.max,
      onChange: (e) => dispatch({ type: ACTION.GMAX, payload: e.target.value }),
    },
    {
      var: state.bmin,
      name: "B min",
      defaultValue: initialState.bmin,
      min: minMax.rgb.min,
      max: state.bmax,
      onChange: (e) => dispatch({ type: ACTION.BMIN, payload: e.target.value }),
    },
    {
      var: state.bmax,
      name: "B max",
      defaultValue: initialState.bmax,
      min: state.bmin,
      max: minMax.rgb.max,
      onChange: (e) => dispatch({ type: ACTION.BMAX, payload: e.target.value }),
    },
  ];

  useEffect(() => {
    let data = new RandomPixelSquare(
      state.dimension,
      state.rmin,
      state.rmax,
      state.gmin,
      state.gmax,
      state.bmin,
      state.bmax
    );
    if (state.sortHueCol) {
      data.sortHueVertical(state.sortHueColLen);
    }
    if (state.sortHueRow) {
      data.sortHue(state.sortHueRowLen);
    }
    setPixelMap(data.data);
  }, [
    state.sortHueRowLen,
    state.sortHueColLen,
    state.sortHueCol,
    state.sortHueRow,
    state.rmin,
    state.rmax,
    state.gmin,
    state.gmax,
    state.bmin,
    state.bmax,
    state.dimension,
  ]);

  const handleSave = () =>{
    setDisableSave(true);
    let data = {
      pixelMap: pixelMap,
      borderRadius: state.borderRadius,
      grid: state.grid,
      backgroundColor: state.backgroundColor
    };

    postAppNew(data)
    .then((res) => console.log(res))
    .catch((err) => console.error(err));

    setDisableSave(false);
  }

  return (
    <Page className="generator">
      <Controller
        disableSave={disableSave}
        handleSave={handleSave}
        title={state.title}
        onTitleChange={(e) => dispatch({type: ACTION.TITLE, payload: e.target.value})}
        sliders={sliders} 
        top={
          <>
          <Button onClick={(e) => {dispatch({type: ACTION.RANDOM})}} className="courier">
            Random
          </Button>
          </>
        }
        bottom={
          <>
          <ToolLabel>grid lines</ToolLabel>
          <Toggle
            onChange={(e) => dispatch({type: ACTION.GRID, payload: e.target.checked})}
            checked={state.grid}
          />
          <ToolLabel>background color</ToolLabel>
          <HuePicker
            color={state.backgroundColor}
            onChangeComplete={(color, e) => dispatch({type: ACTION.BGCOLOR, payload: color.hex})}
          /> 
          <Toggle
            onChange={(e) => dispatch({type: ACTION.GRID, payload: e.target.checked})}
            checked={state.grid}
          />
          <ToolLabel>sort hue by rows</ToolLabel>
          <Toggle 
            onChange={(e)=>dispatch({type:ACTION.SORTHUEROW, payload: e.target.checked})} 
            id="sortHueRow" 
            checked={state.sortHueRow} 
          />
          <ToolLabel>sort length:{state.sortHueRowLen}</ToolLabel>
          <Slider
            min={0}
            max={state.dimension}
            onChange={(e) => dispatch({type:ACTION.SORTHUEROWLEN, payload: e.target.value})}
            id="sortHueRowLen"
            defaultValue={state.dimension}
          />
          <ToolLabel>sort hue by columns</ToolLabel>
          <Toggle 
            onChange={(e) => dispatch({type: ACTION.SORTHUECOL, payload: e.target.checked})} 
            id="sortHueCol" 
            checked={state.sortHueCol} 
          />
          <ToolLabel>sort length:{state.sortHueColLen}</ToolLabel>
          <Slider
            min={0}
            max={state.dimension}
            onChange={(e) => dispatch({type: ACTION.SORTHUECOLLEN, payload: e.target.value})}
            id="sortHueColLen"
            defaultValue={state.dimension}
          />
          <Button onClick={(e) => {dispatch({type: ACTION.RESET})}} className="courier red">
            Reset
          </Button>
          </>
        }
      />
      <PixelApp
        pixelMap={pixelMap}
        pixelSize={state.pixelSize/state.dimension}//state.pixelSize}
        borderRadius={state.borderRadius}
        grid={state.grid}
        backgroundColor={state.backgroundColor}
      />
    </Page>
  );
};

export default RandomGenerator;
