import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { ACTION, StoreContext } from "../util/contextreducer";

import { NavBar, NavGroup, NavLogo, NavItem } from "../components/navbar";
import { Link } from "react-router-dom";

import { randInt } from "../util/util";
import { RandomPixelSquare } from "../app/generator";
import PixelApp from "../app/app";
import { Row } from "../components/layout";

const Logout = (props) => {
  const { dispatch } = useContext(StoreContext);
  const [loggedIn, setLoggedIn] = useState(true);

  const handleClick = (event) => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch({ type: ACTION.LOGOUT });

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

  const [pixelMap, setPixelMap] = useState([[{ r: 1, b: 1, g: 1 }]]);
  const [grid, setGrid] = useState(false);

  useEffect(() => {
    let data = new RandomPixelSquare(3, 0, 255, 0, 255, 0, 255);
    data.sortHue();
    setPixelMap(data.data);
    setGrid(randInt(0, 1));
  }, []);

  return (
    <NavBar>
      <NavLogo>
        <Link to="/home">
          <Row>
            <PixelApp
              pixelMap={pixelMap}
              borderRadius={randInt(0, 50)}
              grid={grid}
              // backgroundColor={`rgb(${randInt(0,255)}, ${randInt(0,255)}, ${randInt(0,255)}`}
              pixelSize={grid ? 30 / pixelMap.length - 2 : 30 / pixelMap.length}
            />
            <h2 className="courier">mosaic</h2>
          </Row>
        </Link>
      </NavLogo>
      <NavGroup>
        <NavItem>
          <Link to={`/image`}>
            <h4>
              Image <i className="fas fa-plus-square"></i>
            </h4>
          </Link>
        </NavItem>
        <NavItem>
          <Link to={`/generator`}>
            <h4>
              Random <i className="fas fa-plus-square"></i>
            </h4>
          </Link>
        </NavItem>
        <NavItem>
          <Link to={`/profile/${state.username}`}>
            <h4>
              <i className="fas fa-user-circle"></i>
            </h4>
          </Link>
        </NavItem>
        <NavItem>
          <div>
            <Logout>
              <i className="fas fa-sign-out-alt"></i>
            </Logout>
          </div>
        </NavItem>
      </NavGroup>
    </NavBar>
  );
};
export default UserNav;
