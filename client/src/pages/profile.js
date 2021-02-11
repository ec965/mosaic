import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { dispatchError, StoreContext } from '../util/contextreducer';

import { Page, Row, Column } from "../components/layout";
import PixelCard from "../app/card";
import { maxPixelCardWidth, dateString } from '../util/util';
import { instance, PROJECTS, DELETE } from '../config/api';

import MyLoader from '../components/loader';
import CardMatrix from '../components/matrix';
import { NoMore, LoadMore } from '../components/loadmore';

const UserProfile = () => {
  const [username, setUsername] = useState(null);
  const [joinDate, setJoinDate] = useState(null);
  const [projects, setProjects] = useState(null);
  const [ noMore, setNoMore ] = useState(false);
  const [ disable, setDisable ] = useState(false);
  const { state, dispatch } = useContext(StoreContext);

  // calculates the max pixel card width depending on the window size
  const cardWidth = maxPixelCardWidth();

  let { thisUser } = useParams();

  function getUserInfo(lastDate=null) {
    setDisable(true);

    if (!lastDate) lastDate = Date.now();
    let postlimit = window.innerWidth/cardWidth * 2;

    instance.get(
      PROJECTS,
      {
        params: {
          username: thisUser, 
          date: lastDate, 
          postlimit: postlimit
        }
      }
    )
      .then((res) => {
        // assign res.data to state vars
        if(!username ) setUsername(res.data.user.username);
        if(!joinDate) setJoinDate(res.data.user.createdAt);


        if(!projects) setProjects(res.data.data);
        else {
          // on subsequent runs of this function, just update the projects arr
          let update = [...projects];
          setProjects(update.concat(res.data.data));
        }
        
        // show the 'no more content message' if we don't get back the amount we requested
        if (res.data.data.length < res.data.postlimit) {
          setNoMore(true);
        }
      })
      .catch((error) => dispatchError(error, dispatch));
    setDisable(false);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleDelete = (event) => {
    event.preventDefault();
    let info = JSON.parse(event.target.id);
    let index = info.index;
    let id = info.id;

    instance.delete(DELETE, {params: {id: id}})
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
              <MyLoader/>
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
                  <div>
                    <CardMatrix>
                      {projects.map((p, i) => {
                        return (
                          <PixelCard
                            key={i}
                            title={p.title}
                            username={p.username}
                            date={p.updatedAt}
                            project={p.project}
                            maxWidth={cardWidth}
                            link={`/project/${p._id}`}
                            body={
                              state.username === thisUser &&
                                <CardBottomLinks
                                  onClickDelete={handleDelete}
                                  id={p._id}
                                  index={i}
                                />
                            }
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
                        onClick={()=>getUserInfo(projects[projects.length-1].updatedAt)}
                      />
                    } 
                  </div>
              }
            </div>
      }
    </Page>
  );
};

const CardBottomLinks = ({id, index, onClickDelete}) => {
  return(
    <Row className={"profile-card-buttons"}>
      <p>
        <Link to={`/generator/${id}`}>
          edit
        </Link>
      </p>
      <p
        id={JSON.stringify({ id: id, index: index })}
        onClick={onClickDelete}
        className="project-delete"
      >
        delete
      </p>
    </Row>
  );
}
export default UserProfile;
