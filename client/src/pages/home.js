import React, { useState, useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { getAppRecent } from "../config/api";

import PixelCard from "../app/card";
import { Page, Row } from "../components/layout";
import Loader from 'react-loader-spinner';
import { maxPixelCardWidth } from "../util/util";
import { StoreContext, dispatchError } from '../util/contextreducer';
import { COLORS } from '../config/colors';

const CardMatrix = () => {
  const [recentProjects, setRecentProjects] = useState(null);
  const { dispatch } = useContext(StoreContext);

  // fetch the most recent projects
  useEffect(() => {
    function getRecent() {
      getAppRecent()
        .then((res) => {
          setRecentProjects(res.data);
        })
        .catch((err) => {
          dispatchError(err, dispatch);
        });
    }

    getRecent();
  }, [dispatch]);

  return (
    <Page className="center-page">
      {recentProjects 
      ? 
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
      : 
        <Row>
          <Loader type="Oval" color={COLORS.base0D} height={80} width={80}/>
        </Row> 
      }
    </Page>
  );
};

export default CardMatrix;
