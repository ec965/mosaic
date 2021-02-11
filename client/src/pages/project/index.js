import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { StoreContext } from "../../util/contextreducer";

import PixelApp from "../../app/app";
import { Column, Page } from "../../components/layout";
import { dateString, maxProjectWidth} from "../../util/util";
import TextBoxForm from "../../components/textbox";
import {
  instance, 
  PROJECT,
  COMMENT,
} from "../../config/api";
import { TEXTBOX } from './config';
import Comment from './comment';
import MyLoader from '../../components/loader';

const ProjectPage = () => {
  const [project, setProject] = useState(null);
  const [username, setUserName] = useState("Loading...");
  const [date, setDate] = useState(Date.now());
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState("");
  const [newComment, setNewComment] = useState("");

  const { state } = useContext(StoreContext);
  const currentUser = state.username;

  let { projectId } = useParams();

  useEffect(() => {
    function getInitialData() {
      instance.get(PROJECT, {params: {id: projectId}})
        .then((res) => {
          setUserName(res.data.username);
          setDate(res.data.createdAt);
          setTitle(res.data.title);
          setProject(res.data.project);
          setComments(res.data.comments);
        })
        .catch((error) => console.error(error));
    }

    getInitialData();
  }, [projectId]);

  const handleNewComment = (event) => {
    setNewComment(event.target.value);
  };

  const submitNewComment = (event) => {
    event.preventDefault();
    if (newComment.length <= 0) return;
    // reset comment box
    instance.post(COMMENT, { project_id: projectId, text: newComment})
      .then((res) => {
        // add the new comment to ui
        let updateComments = [...comments];
        // add comments in order of recency
        // new comments come first
        updateComments.push(res.data);
        setComments(updateComments);
        setNewComment("");
      })
      .catch((error) => console.error(error));
  };

  const handleCommentDelete = (event) => {
    event.preventDefault();
    let metaData = JSON.parse(event.target.id);
    let commentId = metaData.id;
    let commentIndex = metaData.index;

    instance.delete(COMMENT, {params: {project_id: projectId, comment_id: commentId}})
      .then((res) => {
        // remove comment from comments array
        let updateComments = comments.slice(0);
        updateComments.splice(commentIndex, 1);

        setComments(updateComments);
      })
      .catch((error) => console.error(error));
  };

  const commentList = comments.map((c, i) => {
    return (
      <Comment
        key={i}
        index={i}
        username={c.username}
        text={c.text}
        updatedAt={c.updatedAt}
        createdAt={c.createdAt}
        edited={c.edited}
        canEdit={c.username === currentUser}
        id={c._id}
        project_id={projectId}
        onDelete={handleCommentDelete}
      />
    );
  });

  return (
    <Page>
      {!project 
      ?
        <Column>
          <MyLoader/>
        </Column>
      :
        <PixelApp
          pixelMap={project.pixelMap}
          pixelSize={
            project.grid
            ? maxProjectWidth() / Math.max(project.pixelMap[0].length, project.pixelMap.length) - 2
            : maxProjectWidth() / Math.max(project.pixelMap[0].length, project.pixelMap.length) 
          }
          borderRadius={project.borderRadius}
          grid={project.grid}
          backgroundColor={project.backgroundColor}
        />
      }
        <Column className="project-body">
          <h3>{title}</h3>
            <Link to={`/profile/${username}`}>
              <h5>{username}</h5>
            </Link>
            <p className="small grey">
              {dateString(date)}
            </p>
            <br/>
          <TextBoxForm
            onSubmit={submitNewComment}
            maxLength={TEXTBOX.maxLength}
            value={newComment}
            onChange={handleNewComment}
            rows={TEXTBOX.rows}
            cols={TEXTBOX.cols}
            placeholder="What are your thoughts?"
          />
          <div className="project-comment-list">
            {commentList}
          </div>
        </Column>
    </Page>
  );
};

export default ProjectPage;
