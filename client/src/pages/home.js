import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAppRecent } from "../config/api";

import PixelCard from "../app/card";
import { Page } from "../components/layout";
import { initialPixMapArr } from '../config/pixmap';

const CardMatrix = () => {
  const [recentProjects, setRecentProjects] = useState(initialPixMapArr);

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
        ></PixelCard>
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
