import React, {useState, useEffect} from 'react';
import {Row, Column} from '../components/layout';
import  {getToken} from '../auth/functions';
import {Button} from '../components/button';
import PixelApp from '../app/index';
import {dateString} from '../util';
import {APIURL, PROJECT, COMMENT} from '../config/api';
import axios from 'axios';
import TextBoxForm from '../components/textbox';
import {useParams} from 'react-router-dom';

const TEXTBOX = {maxLength: 160, rows:4, cols:40};

const ProjectPage = () => {
  const [project, setProject] = useState({});
  const [username, setUserName] = useState("");
  const [date, setDate] = useState('');
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState('');
  const [newComment, setNewComment] = useState('');

  let {id} = useParams();

  useEffect (() => {
    const token = getToken();
    axios.get(APIURL + PROJECT + '?id=' + id,
      {headers: {"Authorization": `Bearer ${token}`}})
    .then((res) => {
      setUserName(res.data.username);
      setDate(dateString(res.data.updatedAt));
      setTitle(res.data.title);
      setComments(res.data.comments.reverse());
      setProject(res.data.project);
    })
    .catch((error) => console.error(error));
  }, [])

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
      updateComments.unshift(res.data);
      setComments(updateComments);
    })
    .catch((error) => console.error(error));
  }


  const commentList = comments.map((c,i) => {
    const currentUser = localStorage.getItem('username');
    return(
      <Comment
        key={i}
        username={c.username}
        text={c.text}
        updatedAt={c.updatedAt}
        edited={c.edited}
        canEdit={c.username === currentUser}
        id={c._id}
        project_id={id}
      />
    );
  });

  return(
    <div>
      <h5>{title}</h5>
      <h5>{username}</h5>
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

    const token = getToken();
    const data = {project_id: props.project_id, comment:{id: props.id, text: text}};
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
      <p>{username}</p>
      <p>{text}</p>
      <p>{updatedAt}</p>
      {edited && <p>edited</p>}
      {props.canEdit &&
        <p className="link" onClick={handleShowEdit}>edit</p>
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