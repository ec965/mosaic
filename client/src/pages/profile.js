import React, {useEffect, useState} from 'react';
import {Row, Column} from '../components/layout';
import {APIURL, USERPROJECTS} from '../config/api';
import axios from "axios";
import PixelCard from '../app/card';
import  {getToken} from '../auth/functions';
import {Button} from '../components/button';
import {Link, useRouteMatch, Switch} from 'react-router-dom';
import PrivateRoute from '../router/privateroute';
import ProjectPage from './project';

const UserProfile = () => {
  let match = useRouteMatch();
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


  const cards = data.map((d, i) => {
    return(
      <Link to={`${match.url}/${d._id}`} className='row profile-card' key={i}>
        <PixelCard 
          title={d.title} 
          className='profile-card' 
          date={d.updated} 
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
    )
  });

  const routes = data.map((d,i) => {
    return(
      <PrivateRoute path={`${match.path}/${d._id}`} key={i}>
        <ProjectPage id={d._id}/>
      </PrivateRoute>
    );
  });

  return(
    <Switch>
      {routes}
      <PrivateRoute path={`${match.path}`}>
        <Column>
          <h3>{username}'s Projects</h3>
          {cards}
        </Column>
      </PrivateRoute>
    </Switch>
  );
}

export default UserProfile;