import React, {useState, useEffect} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import axios from 'axios';

import {APIURL, NEW, PROJECT, UPDATE} from '../config/api';
import { getToken } from '../util';

import {Button} from '../components/button';
import PixelApp from '../app/app';
import Toggle from '../components/toggle';
import Slider from '../components/slider';
import {Page} from '../components/layout';


const ToolLabel = (props) => <h6 onClick={props.onClick} className={`${props.className} courier`}>{props.children}</h6>

const Generator = () =>{
  const [title, setTitle] = useState('');
  const [dimension, setDimension] = useState(10);
  const [borderRadius, setBorderRadius] = useState(25);
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
  const [redirectId, setRedirectId] = useState(false);
  const [disableSave, setdisableSave] = useState(false);

  let {id} = useParams();

  useEffect (() => {
    // load initial data if the user is trying to EDIT
    function getInitialData(){
      let token = getToken();
      axios.get(APIURL + PROJECT + '?id=' + id,
        {headers: {"Authorization": `Bearer ${token}`}})
      .then((res) => {
        setTitle(res.data.title);
        let project = res.data.project;
        setDimension(project.dimension);
        setBorderRadius(project.borderRadius);
        setRmin(project.rmin);
        setRmax(project.rmax);
        setGmin(project.gmin);
        setGmax(project.gmax);
        setBmin(project.bmin);
        setBmax(project.bmax);
        setSortHueRow(project.sortHueRow);
        setSortHueCol(project.sortHueCol);
        setSortHueColLen(project.sortHueColLen);
        setSortHueRowLen(project.sortHueRowLen);
      })
      .catch((error) => console.error(error));
    }
    if(id){
      getInitialData();
    }
  }, [id])

  const sliders = [
    {
      min: 1,
      max: 30,
      name:'pixel density',
      defaultValue: 10,
      var: dimension,
    },
    {
      min: 0,
      max: 50,
      name:'border radius',
      defaultValue: 25,
      var: borderRadius
    },
    {
      min: 0,
      max: rmax,
      name:'rmin',
      defaultValue: 0,
      var: rmin
    },
    {
      min: rmin,
      max: 255,
      name:'rmax',
      defaultValue: 255,
      var: rmax
    },
    {
      min: 0,
      max: gmax,
      name:'gmin',
      defaultValue: 0,
      var: gmin
    },
    {
      min: gmin,
      max: 255,
      name:'gmax',
      defaultValue: 255,
      var: gmax
    },
    {
      min: 0,
      max: bmax,
      name:'bmin',
      defaultValue: 0,
      var: bmin
    },
    {
      min: bmin,
      max: 255,
      name:'bmax',
      defaultValue: 255,
      var: bmax,
    },
  ];

  const handleChange = (event) => {
    switch(event.target.id){
      case 'title':
        setTitle(event.target.value);
        break;
      case 'pixel density':
        setDimension(event.target.value);
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
    setdisableSave(true);

    const data = {
      title: title,
      project:{
        dimension: dimension,
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
    }
    
    async function sendData(){
      let token = getToken();
      // get the token from local storage
      const header = {headers: {"Authorization": `Bearer ${token}`}}

      // if we are editing something, then PATCH
      if (id){
        data.project_id = id.toString();
        return await axios.patch(APIURL + UPDATE, data, header)
      } else {
        // post data if we are creating something NEW
        return await axios.post(APIURL + NEW, data, header)
      }
    }

    sendData()
    .then((res) => {
      setRedirectId(res.data._id);
      setdisableSave(false);
    })
    .catch((error) => {
      console.error(error);
      setdisableSave(false);
    })
  }

  const handleReset = () =>{
    setDimension(sliders[0].defaultValue);
    setBorderRadius(sliders[1].defaultValue);
    setRmin(0);
    setRmax(255);
    setGmin(0);
    setGmax(255);
    setBmin(0);
    setBmax(255);
    setSortHueRowLen(sliders[0].defaultValue);
    setSortHueColLen(sliders[0].defaultValue);
    setSortHueCol(false);
    setSortHueRow(false);
  }

  const handleToggle = (event) =>{
    if(event.target.id === "sortHueRow"){
      setSortHueRow(event.target.checked);
    }
    if(event.target.id === "sortHueCol"){
      setSortHueCol(event.target.checked);
    }
  }

  const handleRandom = () => {
    const rand = (min, max) => {
      return Math.floor(Math.random()*(max-min) + min);
    }

    setDimension(rand(sliders[0].min, sliders[0].max));
    setBorderRadius(rand(sliders[1].min, sliders[1].max));
    setRmin(rand(0,255));
    setRmax(rand(0,255));
    setGmin(rand(0,255));
    setGmax(rand(0,255));
    setBmin(rand(0,255));
    setBmax(rand(0,255));
    setSortHueRowLen(rand(0,dimension));
    setSortHueColLen(rand(0,dimension));
    setSortHueCol(rand(0,1) === 0 ? false : true);
    setSortHueRow(rand(0,1) === 0 ? false : true);
  }

  const sliderTools = sliders.map((t,i) => {
    return(
      <div key={i}>
        <ToolLabel>{t.name}:{t.var}</ToolLabel>
        <Slider
          min={t.min}
          max={t.max}
          onChange={handleChange}
          id={t.name}
          value={t.var}
        />
      </div>
    );
  })

  return(
    <Page className="generator">
      <div className='panel'>
        <Button disabled={disableSave} onClick={handleSave} className="courier">Save</Button>
        <input onChange={handleChange} value={title} type="text" className='form-field' placeholder="Title" id="title"/>
        <Button onClick={handleRandom} className="courier">Random</Button>
        {sliderTools}
        <ToolLabel>sort hue by rows</ToolLabel>
        <Toggle onChange={handleToggle} id='sortHueRow' checked={sortHueRow}/>
        <ToolLabel>sort length</ToolLabel>
        <Slider
          min={0}
          max={dimension}
          onChange={handleChange}
          id="sortHueRowLen"
          defaultValue={dimension}
        />
        <ToolLabel>sort hue by columns</ToolLabel>
        <Toggle onChange={handleToggle} id='sortHueCol' checked={sortHueCol}/>
        <ToolLabel>sort length</ToolLabel>
        <Slider
          min={0}
          max={dimension}
          onChange={handleChange}
          id="sortHueColLen"
          defaultValue={dimension}
        />
        <Button onClick={handleReset} className="courier red">Reset</Button>
      </div>
      <div className='editor'>
        <PixelApp
          dimension={dimension}
          pixelDensity={540}
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
      {redirectId && <Redirect to={`/project/${redirectId}`}/>}
    </Page>
  );
}

export default Generator;