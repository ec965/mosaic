import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAppRecent } from '../config/api';

import { dateString } from "../util/util";
import PixelCard from "../app/card";
import PixelApp from '../app/app';
import { Page } from "../components/layout";

const CardMatrix = () => {
  const [recentProjects, setRecentProjects] = useState([{
      title: '',
      username: '',
      createdAt: 1,
      project:{
        pixelMap: [[{r:1, g:1, b:1}]],
        borderRadius: 0,
        grid: false,
        backgroundColor: '#fff',
      }
    }]);

  // fetch the most recent projects
  useEffect(() => {
    function getRecent() {
      getAppRecent()
      .then((res) => {
        setRecentProjects(res.data);
      })
      .catch((err) => console.error(err));
    }

    getRecent();
  }, []);

  const cards = recentProjects.map((p, i) => {
    // scale to fit on home page
    return (
      <Link to={`project/${p._id}`} key={i}>
        <PixelCard
          title={p.title}
          username={p.username}
          date={p.createdAt}
          project={p.project}
          maxWidth={360}
        >
        </PixelCard>
      </Link>
    );
  });

  return (
    <Page className="center-page">
      <div className="matrix">{cards}</div>
    </Page>
  );
};

export default CardMatrix;
