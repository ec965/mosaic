import React, { useEffect, useState, useReducer, useContext } from "react";
import { useParams } from "react-router-dom";
import { CompactPicker }  from "react-color";

import { getProject, postOrPatchApp } from "../config/api";
import { randInt, redirect } from '../util/util';
import { StoreContext, dispatchError } from '../util/contextreducer';

import { Button } from "../components/button";
import { Page } from "../components/layout";
import Toggle from "../components/toggle";

import { RandomPixelSquare } from "./generator";
import PixelApp from "./app.js";
import Controller, { ToolLabel, ToolBox, ToolSlider } from "./controller";

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
  GRID: "grid",
  BGCOLOR: "backgroundColor",
  RESET: "reset",
  RANDOM: "random",
  TITLE: "title",
  GETDATA: "getData",
  PARTIALRESET: 'partialReset',
  PARTIALRANDOM: 'partialRandom',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION.BORDERRADIUS:
      return { ...state, borderRadius: action.payload };
    case ACTION.BGCOLOR:
      return { ...state, backgroundColor: action.payload };
    case ACTION.DIMENSION:
      let outState = {...state, dimension: action.payload};
      if (action.payload < state.sortHueColLen){
        outState = {...outState, sortHueColLen: action.payload};
      }
      if (action.payload < state.sortHueRowLen){
        outState = { ...outState, sortHueRowLen: action.payload};
      }
      return outState;
    case ACTION.PIXELSIZE:
      return { ...state, pixelSize: action.payload };
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
      return { ...state, sortHueRow: action.payload };
    case ACTION.SORTHUEROWLEN:
      return { ...state, sortHueRowLen: action.payload };
    case ACTION.SORTHUECOL:
      return { ...state, sortHueCol: action.payload };
    case ACTION.SORTHUECOLLEN:
      return { ...state, sortHueColLen: action.payload };
    case ACTION.GRID:
      return { ...state, grid: action.payload };
    case ACTION.TITLE:
      return { ...state, title: action.payload };
    case ACTION.RESET:
      return initialState;
    case ACTION.RANDOM:
      return {
        ...state,
        dimension: randInt(minMax.dimension.min, minMax.dimension.max),
        borderRadius: randInt(minMax.borderRadius.min, minMax.borderRadius.max),
        rmin: randInt(minMax.rgb.min, state.rmax),
        rmax: randInt(state.rmin, minMax.rgb.max),
        gmin: randInt(minMax.rgb.min, state.gmax),
        gmax: randInt(state.gmin, minMax.rgb.max),
        bmin: randInt(minMax.rgb.min, state.bmax),
        bmax: randInt(state.bmin, minMax.rgb.max),
        sortHueRow: randInt(0, 1),
        sortHueCol: randInt(0, 1),
        sortHueRowLen: -1,
        sortHueColLen: -1,
        grid: randInt(0, 1),
        backgroundColor: `rgb(${randInt(0, 255)}, ${randInt(0, 255)}, ${randInt(0, 255)})`,
      };
    case ACTION.PARTIALRESET:
      return {
        ...state, 
        borderRadius: action.payload.borderRadius,
        grid: action.payload.grid,
        backgroundColor: action.payload.backgroundColor
      }
    case ACTION.PARTIALRANDOM:
      return {
        ...state,
        borderRadius: randInt(minMax.borderRadius.min, minMax.borderRadius.max),
        grid: randInt(0, 1),
        backgroundColor: `rgb(${randInt(0, 255)}, ${randInt(0, 255)}, ${randInt(0, 255)})`,
      }
    case ACTION.GETDATA:
      return {
        ...state,
        dimension: action.payload.project.pixelMap.length,
        borderRadius: action.payload.project.borderRadius,
        backgroundColor: action.payload.project.backgroundColor,
        grid: action.payload.project.grid,
        title: action.payload.title,
      }
    default:
      return state;
  }
}

const initialState = {
  dimension: 30, // max length is 30*30 = 900
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
  sortHueRowLen: 30,
  sortHueColLen: 30,
  grid: false,
  backgroundColor: "#fff",
  title: "",
};

const minMax = {
  dimension: {
    min: 1,
    max: 30,
  },
  pixelSize: {
    min: 280,
    max: 720,
  },
  borderRadius: {
    min: 0,
    max: 50,
  },
  rgb: {
    min: 0,
    max: 255,
  },
};

const RandomGenerator = (props) => {
  const [pixelMap, setPixelMap] = useState([[]]);
  // toggle this on save to prevent double saving
  const [disableSave, setDisableSave] = useState(false);
  // if we are editing the project, then save the initial state HERE:
  const [editInitialState, setEditIntialState] = useState(initialState);
  // reducer to handle options of generator
  const [state, dispatch] = useReducer(reducer, initialState);
  const store = useContext(StoreContext);

  // many things rely on the projectId,
  // if the projectId is truthy, then the user is editing a project
  // if the projectId is falsey, then the user is creating a new project
  // components should behave differently depending on these scenarios
  const { projectId } = useParams();

  // get intial data if the user is attempting to edit a project
  useEffect(() => {
    function getInitialData() {
      getProject(projectId)
        .then((res) => {
          console.log(res.data);
          setPixelMap(res.data.project.pixelMap);
          setEditIntialState(res.data.project);
          dispatch({ type: ACTION.GETDATA, payload: res.data });
        })
        .catch((err) => dispatchError(err, store.dispatch));
    }

    if (projectId) {
      getInitialData();
    }
  }, [projectId, store.dispatch]);

  // array to contruct sliders
  let sliders = [
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
      name: "pixel curvature",
      defaultValue: initialState.borderRadius,
      var: state.borderRadius,
      onChange: (e) =>
        dispatch({ type: ACTION.BORDERRADIUS, payload: e.target.value }),
      percent: true,
    },
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
      var: state.rmin,
      name: "red min",
      defaultValue: initialState.rmin,
      min: minMax.rgb.min,
      max: state.rmax,
      onChange: (e) => dispatch({ type: ACTION.RMIN, payload: e.target.value }),
    },
    {
      var: state.rmax,
      name: "red max",
      defaultValue: initialState.rmax,
      min: state.rmin,
      max: minMax.rgb.max,
      onChange: (e) => dispatch({ type: ACTION.RMAX, payload: e.target.value }),
    },
    {
      var: state.gmin,
      name: "green min",
      defaultValue: initialState.gmin,
      min: minMax.rgb.min,
      max: state.gmax,
      onChange: (e) => dispatch({ type: ACTION.GMIN, payload: e.target.value }),
    },
    {
      var: state.gmax,
      name: "green max",
      defaultValue: initialState.gmax,
      min: state.gmin,
      max: minMax.rgb.max,
      onChange: (e) => dispatch({ type: ACTION.GMAX, payload: e.target.value }),
    },
    {
      var: state.bmin,
      name: "blue min",
      defaultValue: initialState.bmin,
      min: minMax.rgb.min,
      max: state.bmax,
      onChange: (e) => dispatch({ type: ACTION.BMIN, payload: e.target.value }),
    },
    {
      var: state.bmax,
      name: "blue max",
      defaultValue: initialState.bmax,
      min: state.bmin,
      max: minMax.rgb.max,
      onChange: (e) => dispatch({ type: ACTION.BMAX, payload: e.target.value }),
    },
  ];

  // if the user is editing, only load tools that they can use
  if (projectId){
    sliders = [sliders[0], sliders[1]];
  }

  useEffect(() => {
    if (projectId) return; // don't change colors if editing
    let data = new RandomPixelSquare(
      state.dimension,
      state.rmin,
      state.rmax,
      state.gmin,
      state.gmax,
      state.bmin,
      state.bmax,
      undefined
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
    projectId,
  ]);

  // handle Saving
  const handleSave = () => {

    setDisableSave(true);
    let data = {
      title: state.title.trim(),
      project: {
        pixelMap: pixelMap,
        borderRadius: state.borderRadius,
        grid: state.grid,
        backgroundColor: state.backgroundColor,
      },
    };

    postOrPatchApp(data, projectId)
      .then((res) => redirect(`/project/${res.data}`)) 
      .catch((err) => dispatchError(err, store.dispatch));

    setDisableSave(false);
  };

  return (
    <Page className="generator">
      <Controller
        disableSave={disableSave}
        handleSave={handleSave}
        title={state.title}
        onTitleChange={(e) =>
          dispatch({ type: ACTION.TITLE, payload: e.target.value })
        }
        sliders={sliders}
        top={
          <div>
            <Button
              onClick={(e) => {
                projectId
                ? dispatch({ type: ACTION.PARTIALRANDOM })
                : dispatch({ type: ACTION.RANDOM })
              }}
              className="courier"
            >
              Random
            </Button>
          </div>
        }
        bottom={
          <div>
            <ToolBox>
              <ToolLabel>grid lines</ToolLabel>
              <Toggle
                onChange={(e) =>
                  dispatch({ type: ACTION.GRID, payload: e.target.checked })
                }
                checked={state.grid}
              />
            </ToolBox>
            <ToolBox>
              <ToolLabel>
                background color 
              </ToolLabel>
              <CompactPicker
                color={state.backgroundColor}
                onChangeComplete={(color, e) =>
                  dispatch({ type: ACTION.BGCOLOR, payload: color.hex })
                }
              />
            </ToolBox>

            {!projectId && 
              <>
              <ToolBox>
                <ToolLabel>sort colors horizontally</ToolLabel>
                <Toggle
                  onChange={(e) =>
                    dispatch({ type: ACTION.SORTHUEROW, payload: e.target.checked })
                  }
                  id="sortHueRow"
                  checked={state.sortHueRow}
                />
                <ToolSlider
                  name='sort amount'
                  value={state.sortHueRowLen}
                  min={0}
                  max={state.dimension}
                  onChange={(e) =>
                    dispatch({
                      type: ACTION.SORTHUEROWLEN,
                      payload: e.target.value,
                    })
                  }
                  id="sortHueRowLen"
                  percent
                />
              </ToolBox>
              <ToolBox>
                <ToolLabel>sort colors vertically</ToolLabel>
                <Toggle
                  onChange={(e) =>
                    dispatch({ type: ACTION.SORTHUECOL, payload: e.target.checked })
                  }
                  id="sortHueCol"
                  checked={state.sortHueCol}
                />
                <ToolSlider
                  name={'sort amount'}
                  value={state.sortHueColLen}
                  min={0}
                  max={state.dimension}
                  onChange={(e) =>
                    dispatch({
                      type: ACTION.SORTHUECOLLEN,
                      payload: e.target.value,
                    })
                  }
                  id="sortHueColLen"
                  percent
                />
              </ToolBox>
              </>
            }
            <Button
              onClick={projectId 
                ? (e) => {dispatch({ type: ACTION.PARTIALRESET, payload: editInitialState})}
                : (e) => {dispatch({ type: ACTION.RESET })}
              }
              className="courier red"
            >
              Reset
            </Button>
          </div>
        }
      />
      <PixelApp
        pixelMap={pixelMap}
        // pixelSize={state.pixelSize/pixelMap.length}
        pixelSize={
          state.grid ? state.pixelSize/pixelMap.length - 2 : state.pixelSize/pixelMap.length
        }
        borderRadius={state.borderRadius}
        grid={state.grid}
        backgroundColor={state.backgroundColor}
      />
      <div/>
    </Page>
  );
};

export default RandomGenerator;
