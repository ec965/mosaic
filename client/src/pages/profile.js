import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Page, Column } from "../components/layout";
import PixelCard from "../app/card";
import { Button } from "../components/button";
import { deleteProject, getAppUserProjects } from "../config/api";

const UserProfile = () => {
  const [username, setUsername] = useState("");
  const [projects, setProjects] = useState([{
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

  let { thisUser } = useParams();

  useEffect(() => {
    function getUserInfo() {
      getAppUserProjects(thisUser)
        .then((res) => {
          setUsername(res.data.username);
          setProjects(res.data.data);
        })
        .catch((error) => console.error(error));
    }

    getUserInfo();
  }, [thisUser]);

  const handleDelete = (event) => {
    event.preventDefault();
    let info = JSON.parse(event.target.id);
    let index = info.index;
    let id = info.id
    deleteProject(id)
      .then((res) => {
        let update = [...projects]
        update.splice(index,1);
        setProjects(update);
      })
      .catch((error) => console.error(error));
  };

  const cards = projects.map((p, i) => {
    return (
      <div className="row profile-card" key={i}>
        <Link to={`/project/${p._id}`} className="row profile-card">
          <PixelCard
            title={p.title}
            username={p.username}
            date={p.createdAt}
            project={p.project}
            maxWidth={360}
          >
          </PixelCard>
        </Link>
        <Button id={JSON.stringify({id:p._id, index:i})} onClick={handleDelete} className="red">
          Delete
        </Button>

        <Link to={`/generator/${p._id}`}>
          <Button>Edit</Button>
        </Link>
      </div>
    );
  });

  return (
    <Page>
      <Column>
        <h3>{username}'s Projects</h3>
        {projects.length === 0 ? <h5>Nothing to see here.</h5> : cards}
      </Column>
    </Page>
  );
};

export default UserProfile;
