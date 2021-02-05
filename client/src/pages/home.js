import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {APIURL, RECENT} from '../config/api';

import {dateString, getToken} from '../util';

import PixelCard from '../app/card';
import {Link} from 'react-router-dom'
import {Page} from '../components/layout';

const CardMatrix = () => {
  const [recentProjects, setRecentProjects] = useState([]);
  // fetch the most recent projects
  useEffect(() => {
    function getRecent(){
      const token = getToken();
      axios.get(APIURL+RECENT, {headers: {"Authorization": `Bearer ${token}`}})
      .then((res) => {
        setRecentProjects(res.data);
      })
      .catch((err) => console.error(err));
    }

    getRecent();
  },[])

  const cards = recentProjects.map((p, i) => {
    // scale to fit on home page
    let pixelSize;
    if (p.project.dimension){
      pixelSize = 300/p.project.dimension;
    } else {
      pixelSize = null;
    }
    return(
      <Link to={`project/${p._id}`} key={i}>
        <PixelCard 
          title={p.title} 
          date={dateString(p.updatedAt)} 
          username={p.username}
          dimension={p.project.dimension || null}
          pixelSize={pixelSize || null}
          borderRadius={p.project.borderRadius || null}
          rmin={p.project.rmin || null}
          rmax={p.project.rmax || null}
          gmin={p.project.gmin || null}
          gmax={p.project.gmax || null}
          bmin={p.project.bmin || null}
          bmax={p.project.bmax || null}
          sortHueRow={p.project.sortHueRow || null}
          sortHueCol={p.project.sortHueCol || null}
          sortHueRowLen={p.project.sortHueRowLen || null}
          sortHueColLen={p.project.sortHueColLen || null}
        />
      </Link>
    );
  })

  return(
    <Page className='center-page'>
      <div className='matrix'>
        {cards}
      </div>
    </Page>
  );
}

export default CardMatrix;