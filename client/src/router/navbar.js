import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

import {NavBar, NavGroup, NavLogo, NavItem} from '../components/navbar';
import {Link} from 'react-router-dom';
import {getUsername} from '../util.js';

const Logout = (props) => {
  const [loggedIn, setLoggedIn] = useState(true);

  const handleClick = (event) => {
    localStorage.clear();
    sessionStorage.clear();
    setLoggedIn(false);
  }

  return(
    <>
      <h4 className="logout link" onClick={handleClick}>
        {props.children}
      </h4>
      {!loggedIn && <Redirect to="/"/>}
    </>
  );
}

const UserNav = () => {
  let currentUser = getUsername();
  return(
    <NavBar>
      <NavLogo>
        <Link to='/home'>
          <h2>User-Land</h2>
        </Link>
      </NavLogo>
      <NavGroup>
        <NavItem>
          <Link to={`/generator`}>
            <h4>Generator</h4>
          </Link>
        </NavItem>
        <NavItem>
          <Link to={`/profile/${currentUser}`}>
            <h4>Profile</h4>
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
export default UserNav;