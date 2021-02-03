import React, {useEffect, useState} from 'react';
import {Page, Column} from '../components/layout';
import {APIURL, DELETE, USERPROJECTS} from '../config/api';
import axios from "axios";
import PixelCard from '../app/card';
import  {getToken} from '../auth/functions';
import {Button} from '../components/button';
import {Link} from 'react-router-dom';

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [data, setData] = useState([]);
  
  useEffect (() => {
    const token = getToken();
    axios.get(APIURL+USERPROJECTS, {headers: {"Authorization": `Bearer ${token}`}})
    .then((res)=>{
      setUsername(res.data.username);
      setData(res.data.data);
    })
    .catch((error) => console.error(error));
  },[]);

  const handleDelete = (event) => {
    event.preventDefault();
    const token = getToken();
    axios.delete(APIURL + DELETE,
      {id: event.target.name},
      {headers: {"Authorization": `Bearer ${token}`}}
    )
  }

  const cards = data.map((d, i) => {
    console.log(d);
    return(
      <div className='row profile-card' key={i}>
      <Link to={`/project/${d._id}`} className='row profile-card'>
        <PixelCard 
          title={d.title} 
          className='profile-card' 
          date={d.updatedAt} 
          dimension={d.project.dimension || null}
          pixelSize={d.project.pixelSize || null}
          borderRadius={d.project.borderRadius || null}
          rmin={d.project.rmin || null}
          rmax={d.project.rmax || null}
          gmin={d.project.gmin || null}
          gmax={d.project.gmax || null}
          bmin={d.project.bmin || null}
          bmax={d.project.bmax || null}
          sortHueRow={d.project.sortHueRow || null}
          sortHueRowLen={d.project.sortHueRowLen || null}
          sortHueCol={d.project.sortHueCol || null}
          sortHueColLen={d.project.sortHueColLen || null}
        />
      </Link>
      <Button name={d.project._id} onClick={handleDelete} className="red">Delete</Button>
      </div>
    )
  });

  return(
    <Page>
      <Column>
        <h3>{username}'s Projects</h3>
        {cards}
      </Column>
    </Page>
  );
}

export default UserProfile;