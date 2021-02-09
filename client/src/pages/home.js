import React, { useState,useContext, useEffect } from "react";
import { instance, RECENT } from '../config/api';
import { Button } from '../components/button';

import PixelCard from "../app/card";
import { Page, Row } from "../components/layout";
import Loader from 'react-loader-spinner';
import { maxPixelCardWidth } from "../util/util";
import { StoreContext, dispatchError } from '../util/contextreducer';
import { COLORS } from '../config/colors';

const CardMatrix = () => {
  const [recentProjects, setRecentProjects] = useState([]);
  const [ noMore, setNoMore ] = useState(false);
  const [ disable, setDisable ] = useState(false);
  const { dispatch } = useContext(StoreContext);

  // fetch the most recent projects

  const getRecent = (lastDate=null) => {
    setDisable(true);
    if (!lastDate) lastDate = Date.now();
    instance.get(RECENT, {params: {date: lastDate}})
      .then((res) => {
        if (res.data.data.length < res.data.postlimit) {
          setNoMore(true);
        }
        let update = [...recentProjects];
        setRecentProjects(update.concat(res.data.data));
      })
      .catch((err) => {
        dispatchError(err, dispatch);
      });
    setDisable(false);
  }

  // get initial data
  useEffect(() => {
    getRecent();
  },[])


  return (
    <Page className="center-page">
      {recentProjects.length > 0 
      ? 
        <div>
          <div className="matrix">
            {recentProjects.map((p, i) => {
              // scale to fit on home page
              return (
                <div key={i} className="profile-card">
                  <div className="card-wrapper">
                    <PixelCard
                      title={p.title}
                      username={p.username}
                      date={p.createdAt}
                      project={p.project}
                      maxWidth={maxPixelCardWidth()}
                      bodyLink={`project/${p._id}`}
                      link={`/project/${p._id}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
            {noMore 
            ? 
              <Row>
                <p className="italic">No more content to load.</p>
              </Row>
            :  
              <Row>
                { disable && <Loader type="Oval" color={COLORS.base0D} height={30} width={30} style={{"padding-right": "12px"}}/>}
                <Button disable={disable} onClick={() => getRecent(recentProjects[recentProjects.length-1].createdAt)}>Load More</Button>
              </Row>
            } 
        </div>
      :
        <Row>
          <Loader type="Oval" color={COLORS.base0D} height={80} width={80}/>
        </Row> 
      }

    </Page>
  );
};

export default CardMatrix;
