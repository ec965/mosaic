import axios from "axios";
import React, {useEffect, useState} from 'react';
import {APIURL, APP} from '../config/api';
import {Page, Column, Row} from '../components/layout';
import PixelApp from '../app/index';

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [data, setData] = useState([]);

  useEffect (() => {
    let user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    axios.get(APIURL+APP, {headers: {"Authorization": `Bearer ${token}`}})
    .then((res)=>{
      setUsername(res.data.user.username);
      setData(res.data.data);
    })
    .catch((error) => console.error(error));
  },[]);

  return(
    <Page>
      <h3>{username}</h3>
      <PixelApp/>
    </Page>
  );
}
export default UserProfile;