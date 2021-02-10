import React, { useState,useContext, useEffect } from "react";
import { instance, PROJECTS } from '../config/api';
import { StoreContext, dispatchError } from '../util/contextreducer';

import PixelCard from "../app/card";
import { Page, Row } from "../components/layout";

import { maxPixelCardWidth } from "../util/util";

import CardMatrix from '../components/matrix';
import { NoMore, LoadMore } from '../components/loadmore';
import MyLoader from '../components/loader';

const HomePage = () => {
  const [recentProjects, setRecentProjects] = useState([]);
  const [ noMore, setNoMore ] = useState(false);
  const [ disable, setDisable ] = useState(false);
  const { dispatch } = useContext(StoreContext);

  // fetch the most recent projects

  const getRecent = (lastDate=null) => {
    setDisable(true);
    if (!lastDate) lastDate = Date.now();
    instance.get(
      PROJECTS,
      {
        params: {
          date: lastDate, 
          postlimit: 6
        }
      }
    )
      .then((res) => {
        // if we get back less items then we requested then we're at the bottom of the barrel
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
          <CardMatrix>
            {recentProjects.map((p, i) => {
              // scale to fit on home page
              return (
                <PixelCard
                  key={i}
                  title={p.title}
                  username={p.username}
                  date={p.updatedAt}
                  project={p.project}
                  maxWidth={maxPixelCardWidth()}
                  bodyLink={`project/${p._id}`}
                  link={`/project/${p._id}`}
                />
              );
            })}
          </CardMatrix>
            {noMore 
            ? 
              <NoMore/>
            :  
              <LoadMore
                disable={disable}
                onClick={() => getRecent(recentProjects[recentProjects.length-1].updatedAt)}
              />
            } 
        </div>
      :
        <Row>
          <MyLoader/>
        </Row> 
      }

    </Page>
  );
};

export default HomePage;
