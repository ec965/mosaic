import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {APIURL, NEW} from '../config/api';
import {Button} from '../components/button';
import PixelApp from '../app/index';
import Toggle from '../components/toggle';
import {useParams, Redirect} from 'react-router-dom';
import Slider from '../components/slider';
import {Page} from '../components/layout';


const ToolLabel = (props) => <h6 onClick={props.onClick} className={`${props.className} courier`}>{props.children}</h6>

const Generator = () =>{
  const [title, setTitle] = useState('');
  const [dimension, setDimension] = useState(10);
  const [pixelSize, setPixelSize] = useState(30);
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
  const [serverError, setServerError] = useState(false);
  const [redirectId, setRedirectId] = useState(false);

  // let {id} = useParams();

  // useEffect(() => {
  //   if(id){
  //     // get the data for this project
      
  //   }
  // },[])

  const sliders = [
    {
      min: 1,
      max: 30,
      name:'dimensions',
      defaultValue: 10,
      var: dimension,
    },
    {
      min: 1,
      max: 40,
      name:'pixel size',
      defaultValue: 30,
      var: pixelSize
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
      max: 255,
      name:'rmin',
      defaultValue: 0,
      var: rmin
    },
    {
      min: 0,
      max: 255,
      name:'rmax',
      defaultValue: 255,
      var: rmax
    },
    {
      min: 0,
      max: 255,
      name:'gmin',
      defaultValue: 0,
      var: gmin
    },
    {
      min: 0,
      max: 255,
      name:'gmax',
      defaultValue: 255,
      var: gmax
    },
    {
      min: 0,
      max: 255,
      name:'bmin',
      defaultValue: 0,
      var: bmin
    },
    {
      min: 0,
      max: 255,
      name:'bmax',
      defaultValue: 255,
      var: bmax,
    },
  ];

  const handleChange = (event) => {
    switch(event.target.name){
      case 'title':
        setTitle(event.target.value);
        break;
      case 'dimensions':
        setDimension(event.target.value);
        break;
      case 'pixel size':
        setPixelSize(event.target.value);
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
    const data = {
      title: title,
      project:{
        dimension: dimension,
        pixelSize: pixelSize,
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
    
    // get the token from local storage
    let user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;

    // post data
    axios.post(APIURL + NEW, 
      data,
      {headers: {"Authorization": `Bearer ${token}`}}
    )
    .then((res) => {
      // the id of the new project is returned
      setRedirectId(res.data);
    })
    .catch((error) => {
      if(error.response.status === 500){
        setServerError(true);
      }
      console.error(error);
    })
  }

  const handleReset = () =>{
    setDimension(sliders[0].defaultValue);
    setPixelSize(sliders[1].defaultValue);
    setBorderRadius(sliders[2].defaultValue);
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
    if(event.target.name === "sortHueRow"){
      setSortHueRow(event.target.checked);
    }
    if(event.target.name === "sortHueCol"){
      setSortHueCol(event.target.checked);
    }
  }

  const handleRandom = () => {
    const rand = (min, max) => {
      return Math.floor(Math.random()*(max-min) + min);
    }

    setDimension(rand(sliders[0].min, sliders[0].max));
    setPixelSize(rand(sliders[1].min, sliders[1].max));
    setBorderRadius(rand(sliders[2].min, sliders[2].max));
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
        <ToolLabel>{t.name}</ToolLabel>
        <Slider
          min={t.min}
          max={t.max}
          onChange={handleChange}
          name={t.name}
          value={t.var}
        />
      </div>
    );
  })

  return(
    <Page className="generator">
      <div className='panel'>
        <Button onClick={handleSave} className="courier">Save</Button>
        <input onChange={handleChange} value={title} type="text" className='form-field' placeholder="Title" name="title"/>
        <Button onClick={handleRandom} className="courier">Random</Button>
        {sliderTools}
        <ToolLabel>sort hue by rows</ToolLabel>
        <Toggle onClick={handleToggle} name='sortHueRow' checked={sortHueRow}/>
        <ToolLabel>sort length</ToolLabel>
        <Slider
          min={0}
          max={dimension}
          onChange={handleChange}
          name="sortHueRowLen"
          defaultValue={dimension}
        />
        <ToolLabel>sort hue by columns</ToolLabel>
        <Toggle onClick={handleToggle} name='sortHueCol' checked={sortHueCol}/>
        <ToolLabel>sort length</ToolLabel>
        <Slider
          min={0}
          max={dimension}
          onChange={handleChange}
          name="sortHueColLen"
          defaultValue={dimension}
        />
        <Button onClick={handleReset} className="courier red">Reset</Button>
      </div>
      <div className='editor'>
        <PixelApp
          dimension={dimension}
          pixelSize={pixelSize}
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