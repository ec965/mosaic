import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import { ACTION, StoreContext } from "../util/contextreducer";

import { NavBar, NavGroup, NavLogo, NavItem } from "../components/navbar";
import { Link } from "react-router-dom";

const Logout = (props) => {
  const { dispatch } = useContext(StoreContext);
  const [loggedIn, setLoggedIn] = useState(true);

  const handleClick = (event) => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch({type: ACTION.LOGOUT});

    setLoggedIn(false);
  };

  return (
    <>
      <h4 className="logout link" onClick={handleClick}>
        {props.children}
      </h4>
      {!loggedIn && <Redirect to="/" />}
    </>
  );
};

const UserNav = () => {
  const { state } = useContext(StoreContext);

  return (
    <NavBar>
      <NavLogo>
        <Link to="/home">
          <h2>User-Land</h2>
        </Link>
      </NavLogo>
      <NavGroup>
        <NavItem>
          <Link to={`/image`}>
            <h4>Image</h4>
          </Link>
        </NavItem>
        <NavItem>
          <Link to={`/generator`}>
            <h4>Generator</h4>
          </Link>
        </NavItem>
        <NavItem>
          <Link to={`/profile/${state.username}`}>
            <h4>Profile</h4>
          </Link>
        </NavItem>
        <NavItem>
          <div>
            <Logout>Logout</Logout>
          </div>
        </NavItem>
      </NavGroup>
    </NavBar>
  );
};
export default UserNav;
