import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { dispatchError, StoreContext } from '../util/contextreducer';

import { Page, Row, Column } from "../components/layout";
import PixelCard from "../app/card";
import { deleteProject, getAppUserProjects } from "../config/api";
import { maxPixelCardWidth } from '../util/util';
import Loader from 'react-loader-spinner';
import { COLORS } from '../config/colors';
import { dateString } from '../util/util';

const UserProfile = () => {
  const [username, setUsername] = useState("");
  const [joinDate, setJoinDate] = useState('');
  const [projects, setProjects] = useState(null);
  const { state, dispatch } = useContext(StoreContext);

  let { thisUser } = useParams();

  useEffect(() => {
    function getUserInfo() {
      getAppUserProjects(thisUser)
        .then((res) => {
          setJoinDate(res.data.user.createdAt);
          setUsername(res.data.user.username);
          setProjects(res.data.data);
        })
        .catch((error) => dispatchError(error, dispatch));
    }

    getUserInfo();
  }, [thisUser, dispatch]);

  const handleDelete = (event) => {
    event.preventDefault();
    let info = JSON.parse(event.target.id);
    let index = info.index;
    let id = info.id;
    deleteProject(id)
      .then((res) => {
        let update = [...projects];
        update.splice(index, 1);
        setProjects(update);
      })
      .catch((error) => dispatchError(error, dispatch));
  };

  return (
    <Page className="center-page">
        {// waits for the project to load, if user has no projects, display the proper message
        !projects 
          ? 
            <Row>
              <Loader type="Oval" color={COLORS.base0D} height={80} width={80}/>
            </Row> 
          :
            <div>
              <Column>
                <h3>{username}</h3>
                <p>Joined on: {dateString(joinDate)}</p>
              </Column>
              {projects.length===0
                ? 
                  <Row>
                  {state.username === thisUser 
                    ? 
                    <h5 className='grey'>
                      Get started by either <a href={`/image`}>uploading an image</a> or <a href={`/generator`}>
                        generating a random project.
                      </a>
                    </h5> 
                    :
                    <h5 className="grey">Nothing to see here.</h5>
                  }
                  </Row>
                :
                  <div className="matrix">
                    {projects.map((p, i) => {
                      return (
                        <div className="profile-card" key={i}>
                          <div className="card-wrapper">
                            <PixelCard
                              title={p.title}
                              username={p.username}
                              date={p.updatedAt}
                              project={p.project}
                              maxWidth={maxPixelCardWidth()}
                              link={`/project/${p._id}`}
                              body={
                                <>
                                  {state.username === thisUser &&
                                    <Row className={"profile-card-buttons"}>
                                      <p>
                                        <Link to={`/generator/${p._id}`}>
                                          edit
                                        </Link>
                                      </p>
                                      <p
                                        id={JSON.stringify({ id: p._id, index: i })}
                                        onClick={handleDelete}
                                        className="project-delete"
                                      >
                                        delete
                                      </p>
                                    </Row>
                                  }
                                </>
                              }
                            />
                            </div>
                        </div>
                      );
                    })}
                  </div>
              }
            </div>
      }
    </Page>
  );
};

export default UserProfile;
