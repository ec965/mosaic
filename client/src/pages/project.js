import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';

import {APIURL, PROJECT, COMMENT} from '../config/api';
import {getUsername, getToken} from '../util.js';

import PixelApp from '../app/index';
import {Column} from '../components/layout';
import {dateString} from '../util';
import TextBoxForm from '../components/textbox';

const TEXTBOX = {maxLength: 160, rows:4, cols:40};

const ProjectPage = () => {
  const [project, setProject] = useState({});
  const [username, setUserName] = useState("");
  const [date, setDate] = useState('');
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState('');
  const [newComment, setNewComment] = useState('');

  const currentUser = getUsername();
  let {id} = useParams();

  useEffect (() => {
    function getInitialData(){
      const token = getToken();
      axios.get(APIURL + PROJECT + '?id=' + id,
        {headers: {"Authorization": `Bearer ${token}`}})
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
  }, [id])

  const handleNewComment = (event) =>{
    setNewComment(event.target.value);
  }


  const submitNewComment = (event) => {
    event.preventDefault();
    // reset comment box
    setNewComment('');
    const token = getToken();
    axios.post(APIURL + COMMENT,
      {project_id: id, text: newComment},
      {headers: {"Authorization": `Bearer ${token}`}}
    )
    .then((res) => {
      // add the new comment to ui
      let updateComments = comments.slice(0);
      // add comments in order of recency
      // new comments come first
      updateComments.push(res.data);
      setComments(updateComments);
    })
    .catch((error) => console.error(error));
  }

  const handleCommentDelete = (event) => {
    event.preventDefault();
    let metaData = JSON.parse(event.target.id);
    let commentId = metaData.id;
    let commentIndex = metaData.index;

    const params = `?project_id=${id}&comment_id=${commentId}`;
    const token = getToken();
    const header = {headers: {'Authorization': `Bearer ${token}`}};
    axios.delete(APIURL + COMMENT + params,
      header
    )
    .then((res) => {
      // remove comment from comments array
      let updateComments = comments.slice(0);
      updateComments.splice(commentIndex, 1);
      
      setComments(updateComments);
    })
    .catch((error) => console.error(error));
  }

  const commentList = comments.map((c,i) => {
    return(
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
        project_id={id}
        onDelete={handleCommentDelete}
      />
    );
  });

  return(
    <div>
      <h5>{title}</h5>
      <Link to={`/profile/${username}`}>
        <h5>{username}</h5>
      </Link>
      <h5>{date}</h5>
      <PixelApp
        dimension={project.dimension}
        pixelSize={project.pixelSize}
        borderRadius={project.borderRadius}
        rmin={project.rmin}
        rmax={project.rmax}
        gmin={project.gmin}
        gmax={project.gmax}
        bmin={project.bmin}
        bmax={project.bmax}
        sortHueRow={project.sortHueRow}
        sortHueCol={project.sortHueCol}
        sortHueColLen={project.sortHueColLen}
        sortHueRowLen={project.sortHueRowLen}
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
}

const Comment = (props) => {
  const [showEditBox, setShowEditBox] = useState(false);
  const [text, setText] = useState(props.text);
  const [updatedAt, setupdatedAt] = useState(props.updatedAt);
  const [username, setUsername] = useState(props.username);
  const [edited, setEdited] = useState(props.edited);

  const handleShowEdit = () => {
    setShowEditBox(!showEditBox);
  }
  
  const handleChange = (event) => {
    setText(event.target.value);
  }

  const handleSubmit= (event) => {
    event.preventDefault();
    setShowEditBox(false);

    const data = {project_id: props.project_id, comment:{id: props.id, text: text}};
    const token = getToken();
    axios.patch(APIURL + COMMENT,
      data,
      {headers: {"Authorization": `Bearer ${token}`}}
    )
    .then((res) => {
      setupdatedAt(res.data.updatedAt);
      setUsername(res.data.username);
      setEdited(res.data.edited);
      setText(res.data.text);
    })
    .catch((error) => console.error(error));
  }

  return(
    <Column>
      <Link to={`/profile/${username}`}>
        <p>{username}</p>
      </Link>
      <p>{text}</p>
      <p>{props.createdAt}</p>
      {edited && <p>edited on {updatedAt}</p>}
      {props.canEdit &&
        <>
          <p className="link" onClick={handleShowEdit}>edit</p>
          <p id={JSON.stringify({id:props.id, index:props.index})}  onClick={props.onDelete} className="red">X</p>
        </>
      }
      {showEditBox && 
        <TextBoxForm
          onSubmit={handleSubmit}
          maxLength={TEXTBOX.maxLength}
          value={text}
          onChange={handleChange}
          rows={TEXTBOX.rows}
          cols={TEXTBOX.cols}
        />
      }      
    </Column>
  );
}

export default ProjectPage;