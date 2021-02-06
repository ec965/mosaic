import React, {useEffect, useState, useReducer} from 'react';
import {Page} from '../components/layout';
import {RandomPixelSquare} from './generator';
import PixelApp from './app.js';
import Controller from './controller';

const ACTION = {
  DIMENSION: 'dimension',
  PIXELSIZE: 'pixelSize',
  BORDERRADIUS: 'borderRadius',
  RMIN: 'rmin',
  RMAX: 'rmax',
  GMIN: 'gmin',
  GMAX: 'gmax',
  BMIN: 'bmin',
  BMAX: 'bmax',
  SORTHUEROW: 'sortHueRow',
  SORTHUECOL: 'sortHueCol',
  SORTHUEROWLEN: 'sortHueRowLen',
  SORTHUECOLLEN: 'sortHueColLen',
  RESET: 'reset',
  RANDOM: 'random',
}

function reducer(state, action){
  switch(action.type){
    case ACTION.DIMENSION:
      return {...state, dimension: action.payload };
    case ACTION.PIXELSIZE:
      return {...state, pixelSize: action.payload};
    case ACTION.BORDERRADIUS:
      return {...state, borderRadius: action.payload};
    case ACTION.RMAX:
      return {...state, rmax: action.payload};
    case ACTION.RMIN:
      return {...state, rmin: action.payload};
    case ACTION.GMIN:
      return {...state, gmin: action.payload};
    case ACTION.GMAX:
      return {...state, gmax: action.payload};
    case ACTION.BMIN:
      return {...state, bmin: action.payload};
    case ACTION.BMAX:
      return {...state, bmax: action.payload};
    case ACTION.RESET:
      return initialState;
    default:
      return state;
  }
}

const initialState = {
  dimension: 30,
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

const RandomGenerator = (props) => {
  const [pixelMap, setPixelMap] = useState([[]]);
  const [state, dispatch] = useReducer(reducer, initialState);

  const sliders = [
    {min: 1, max: 30, name: 'dimension', defaultValue: 10, var:state.dimension, onChange: (e)=>{dispatch({type: ACTION.DIMENSION, payload: e.target.value});}},
    {min: 1, max: 15, name: 'pixel size', defaultValue:5, var: state.pixelSize, onChange: (e)=>dispatch({type:ACTION.PIXELSIZE, payload: e.target.value})},
    {min: 0, max: 50, name: 'border radius', defaultValue: 25, var:state.borderRadius, onChange: (e)=>dispatch({type:ACTION.BORDERRADIUS, payload: e.target.value})},
    {var: state.rmin, name: 'R min', defaultValue: 0,   min: 0,          max: state.rmax,   onChange: (e)=>dispatch({type:ACTION.RMIN, payload:e.target.value})},
    {var: state.rmax, name: 'R max', defaultValue: 255, min: state.rmin, max: 255, onChange: (e)=>dispatch({type:ACTION.RMAX, payload: e.target.value})},
    {var: state.gmin, name: 'G min', defaultValue: 0,   min: 0,          max: state.gmax,   onChange: (e)=>dispatch({type:ACTION.GMIN, payload: e.target.value})},
    {var: state.gmax, name: 'G max', defaultValue: 255, min: state.gmin, max: 255, onChange: (e) => dispatch({type: ACTION.GMAX, payload: e.target.value})},
    {var: state.bmin, name: 'B min', defaultValue: 0,   min: 0,          max: state.bmax,   onChange: (e)=>dispatch({type:ACTION.BMIN, payload: e.target.value})},
    {var: state.bmax, name: 'B max', defaultValue: 255, min: state.bmin, max: 255, onChange: (e) => dispatch({type:ACTION.BMAX, payload: e.target.value})},
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
    if (state.sortHueCol){
      data.sortHueVertical(state.sortHueColLen);
    }
    if (state.sortHueRow){
      data.sortHue(state.sortHueRowLen);
    }
    setPixelMap(data.data)
  },[
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
    state.dimension
  ]);

  return(
    <Page className="generator">
      <Controller
        sliders={sliders}
      />
      <PixelApp
        pixelMap={pixelMap}
        pixelSize={state.pixelSize}
        borderRadius={state.borderRadius}
        grid={state.grid}
        backgroundColor={state.backgroundColor}
      />
    </Page>
  );
}

export default RandomGenerator;