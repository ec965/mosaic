import React, {useEffect, useState} from 'react';
import {Row, Column} from '../components/layout';
import {APIURL, APP} from '../config/api';
import axios from "axios";
import PixelCard from '../app/card';

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [data, setData] = useState([]);
  useEffect (() => {
    let user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    axios.get(APIURL+APP, {headers: {"Authorization": `Bearer ${token}`}})
    .then((res)=>{
      console.log(res.data);
      setUsername(res.data.username);
      setData(res.data.data);
    })
    .catch((error) => console.error(error));
  },[]);

  const cards = data.map((d, i) => {
    return(
      <>
      {d.project && 
      <PixelCard 
        className='profile-card' 
        key={i} 
        title={d.title} 
        date={d.updated} 
        dimension={d.project.dimension}
        pixelSize={d.project.pixelSize}
        borderRadius={d.project.borderRadius}
        rmin={d.project.rmin}
        rmax={d.project.rmax}
        gmin={d.project.gmin}
        gmax={d.project.gmax}
        bmin={d.project.bmin}
        bmax={d.project.bmax}
        sortHueRow={d.project.sortHueRow}
        sortHueRowLen={d.project.sortHueRowLen}
        sortHueCol={d.project.sortHueCol}
        sortHueColLen={d.project.sortHueColLen}
      />}
      </>
    )
  })

  return(
    <Column>
      <h3>{username}'s Projects</h3>
      {cards}
    </Column>
  );
}

export default UserProfile;