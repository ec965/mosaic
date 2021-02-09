import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { StoreContext } from "../util/contextreducer";

import PixelApp from "../app/app";
import { Column, Page, Row } from "../components/layout";
import { dateString, maxProjectWidth} from "../util/util";
import TextBoxForm from "../components/textbox";
import {
  getProject,
  postProjectComment,
  deleteProjectComment,
  patchProjectComment,
} from "../config/api";

import { initialPixMap } from '../config/pixmap';

const TEXTBOX = { maxLength: 160, rows: 4, cols: 40 };

const ProjectPage = () => {
  const [project, setProject] = useState(initialPixMap.project);
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
      getProject(projectId)
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
    postProjectComment(projectId, newComment)
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

    deleteProjectComment(projectId, commentId)
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

const Comment = (props) => {
  const [showEditBox, setShowEditBox] = useState(false);
  const [text, setText] = useState(props.text);
  const [updatedAt, setupdatedAt] = useState(props.updatedAt);
  const [username, setUsername] = useState(props.username);
  const [edited, setEdited] = useState(props.edited);

  const handleShowEdit = () => {
    setShowEditBox(!showEditBox);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text.length <= 0) return;

    setShowEditBox(false);

    patchProjectComment(props.project_id, props.id, text)
      .then((res) => {
        setupdatedAt(res.data.updatedAt);
        setUsername(res.data.username);
        setEdited(res.data.edited);
        setText(res.data.text);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className='project-comment'>
      <h5>
        <Link to={`/profile/${username}`}>
          {username}
        </Link>
      </h5>
      <p className='small grey-text'>{dateString(props.createdAt)}</p>
      <p>{text}</p>
      {edited && <p className='italic small grey-text'>edited: {dateString(updatedAt)}</p>}
      {props.canEdit && (
        <span className="italic row space-between">
          <p className="link" onClick={handleShowEdit}>
            {showEditBox ? 'cancel' : 'edit'}
          </p>
          <Row>
            <p 
              className='project-delete'
              onClick={props.onDelete}
              id={JSON.stringify({ id: props.id, index: props.index })}
            >
              delete 
            </p>
          </Row>
        </span>
      )}
      {showEditBox && (
        <TextBoxForm
          onSubmit={handleSubmit}
          maxLength={TEXTBOX.maxLength}
          value={text}
          onChange={handleChange}
          rows={TEXTBOX.rows}
          cols={TEXTBOX.cols}
        />
      )}
    </div>
  );
};

export default ProjectPage;
