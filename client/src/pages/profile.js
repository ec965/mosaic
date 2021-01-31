import axios from "axios";
import React, {useEffect, useState} from 'react';
import {APIURL, APP} from '../config/api';
import {Page, Column, Row} from '../components/layout';
import PixelApp from '../app/index';
import {NavBar, NavGroup, NavLogo, NavItem} from '../components/navbar';
import {Logout} from '../auth/components';
import {Link, Switch} from 'react-router-dom';
import PrivateRoute from '../router/privateroute';
import {useRouteMatch} from 'react-router-dom';


const UserNav = () => {
  let match = useRouteMatch("/profile");
  return(
    <NavBar>
      <NavLogo>
        <Link to={`${match.url}`}>
          <h2>User-Land</h2>
        </Link>
      </NavLogo>
      <NavGroup>
        <NavItem>
          <Link to={`${match.url}/generator`}>
            <h4>Generator</h4>
          </Link>
        </NavItem>
        <NavItem>
          <div>
            <Logout>
              Logout
            </Logout>
          </div>
        </NavItem>
      </NavGroup>
    </NavBar>
  );
}

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [data, setData] = useState([]);

  let match = useRouteMatch("/profile");

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
    <>
    <UserNav/>
    <Page>
      <Switch>
        <PrivateRoute path={`${match.path}/generator`}>
          <PixelApp/>
        </PrivateRoute>
        <PrivateRoute path={`${match.path}`}>
          <h3>{username}</h3>
        </PrivateRoute>
      </Switch>
    </Page>
    </>
  );
}
export default UserProfile;