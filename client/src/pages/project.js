import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { StoreContext } from "../util/contextreducer";

import PixelApp from "../app/app";
import { Column } from "../components/layout";
import { dateString } from "../util/util";
import TextBoxForm from "../components/textbox";
import {
  getProject,
  postProjectComment,
  deleteProjectComment,
  patchProjectComment,
} from "../config/api";

const TEXTBOX = { maxLength: 160, rows: 4, cols: 40 };

const ProjectPage = () => {
  const [project, setProject] = useState({
    grid: false,
    pixelMap: [[{ r: 1, g: 1, b: 1 }]],
    borderRadius: 25,
    backgroundColor: "#fff",
  });
  const [username, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [comments, setComments] = useState([
    {
      username: "",
      test: "",
      edited: false,
      updatedAt: 1,
    },
  ]);
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
          setDate(dateString(res.data.updatedAt));
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
    <div>
      <h5>{title}</h5>
      <Link to={`/profile/${username}`}>
        <h5>{username}</h5>
      </Link>
      <h5>{date}</h5>
      <PixelApp
        pixelMap={project.pixelMap}
        pixelSize={360 / project.pixelMap.length}
        borderRadius={project.borderRadius}
        grid={project.grid}
        backgroundColor={project.backgroundColor}
      />
      <TextBoxForm
        onSubmit={submitNewComment}
        maxLength={TEXTBOX.maxLength}
        value={newComment}
        onChange={handleNewComment}
        rows={TEXTBOX.rows}
        cols={TEXTBOX.cols}
      />
      {commentList}
    </div>
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
    <Column>
      <Link to={`/profile/${username}`}>
        <p>{username}</p>
      </Link>
      <p>{text}</p>
      <p>{props.createdAt}</p>
      {edited && <p>edited on {updatedAt}</p>}
      {props.canEdit && (
        <>
          <p className="link" onClick={handleShowEdit}>
            edit
          </p>
          <p
            id={JSON.stringify({ id: props.id, index: props.index })}
            onClick={props.onDelete}
            className="red"
          >
            X
          </p>
        </>
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
    </Column>
  );
};

export default ProjectPage;
