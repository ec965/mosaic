import React, {useState, useEffect} from 'react';
import {Row, Column} from '../components/layout';
import  {getToken} from '../auth/functions';
import {Button} from '../components/button';
import PixelApp from '../app/index';
import {dateString} from '../util';
import {APIURL, DELETE, PROJECT, NEWCOMMENT} from '../config/api';
import axios from 'axios';
import TextBoxForm from '../components/textbox';

const ProjectPage = (props) => {
  const [project, setProject] = useState({});
  const [username, setUserName] = useState("");
  const [date, setDate] = useState('');
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState('');
  const [newComment, setNewComment] = useState('');

  useEffect (() => {
    const token = getToken();
    axios.get(APIURL + PROJECT + '?id=' + props.id,
      {headers: {"Authorization": `Bearer ${token}`}})
    .then((res) => {
      setUserName(res.data.username);
      setDate(dateString(res.data.updated));
      setTitle(res.data.title);
      setComments(res.data.comments.reverse());
      setProject(res.data.project);
    })
    .catch((error) => console.error(error));
  }, [])

  const handleDelete = (event) => {
    event.preventDefault();
    const token = getToken();
    axios.delete(APIURL + DELETE,
      {id: event.target.name},
      {headers: {"Authorization": `Bearer ${token}`}}
    )
  }

  const handleNewComment = (event) =>{
    setNewComment(event.target.value);
  }


  const submitNewComment = (event) => {
    event.preventDefault();
    // reset comment box
    setNewComment('');

    const token = getToken();
    axios.post(APIURL + NEWCOMMENT,
      {project_id: props.id, text: newComment},
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
    return(
      <Comment
        key={i}
        username={c.usernmame}
        text={c.text}
        updated={c.updated}
        edited={c.edited}
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
      <Button name={project._id} onClick={handleDelete} className="red">Delete</Button>
      <TextBoxForm
        onSubmit={submitNewComment}
        maxLength={160}
        value={newComment}
        onChange={handleNewComment}
        rows={4}
        cols={40}
      />
      {commentList}
    </div>
  );
}

const Comment = (props) => {
  return(
    <Column>
      <p>{props.username}</p>
      <p>{props.text}</p>
      <p>{props.updated}</p>
      {props.edited && <p>edited</p>}
    </Column>
  );
}

export default ProjectPage;