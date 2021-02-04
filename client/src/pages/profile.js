import React, {useEffect, useState} from 'react';
import {Page, Column} from '../components/layout';
import {APIURL, DELETE, USERPROJECTS} from '../config/api';
import axios from "axios";
import PixelCard from '../app/card';
import  {getToken} from '../auth/functions';
import {Button} from '../components/button';
import {Link, useParams} from 'react-router-dom';

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [data, setData] = useState([]);

  let {thisUser} = useParams();
  
  useEffect (() => {
    function getUserInfo(){
      const token = getToken();
      axios.get(APIURL+USERPROJECTS + `?username=${thisUser}`, {headers: {"Authorization": `Bearer ${token}`}})
      .then((res)=>{
        setUsername(res.data.username);
        setData(res.data.data);
      })
      .catch((error) => console.error(error));
    }

    getUserInfo();
  },[thisUser]);

  const handleDelete = (event) => {
    event.preventDefault();
    const token = getToken();
    axios.delete(APIURL + DELETE,
      {id: event.target.name},
      {headers: {"Authorization": `Bearer ${token}`}}
    )
  }


  const cards = data.map((d, i) => {
    return(
      <div className='row profile-card' key={i}>
        <Link to={`/project/${d._id}`} className='row profile-card'>
          <PixelCard 
            title={d.title} 
            className='profile-card' 
            date={d.updatedAt} 
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
          />
        </Link>
        <Button name={d.project._id} onClick={handleDelete} className="red">Delete</Button>

        <Link to={`/generator/${d._id}`}>
          <Button>Edit</Button>
        </Link>
      </div>
    )
  });

  return(
    <Page>
      <Column>
        <h3>{username}'s Projects</h3>
        {data.length === 0 ? <h5>Nothing to see here.</h5> : cards}
      </Column>
    </Page>
  );
}

export default UserProfile;