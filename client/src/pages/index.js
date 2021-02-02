import React from 'react';
import {Page, Column, Row} from '../components/layout';
import {NavBar, NavGroup, NavLogo, NavItem} from '../components/navbar';
import {Logout} from '../auth/components';
import {Link, Switch} from 'react-router-dom';
import PrivateRoute from '../router/privateroute';
import {useRouteMatch} from 'react-router-dom';
import CardMatrix from './home';
import UserProfile from './profile';
import Generator from './generator';

const UserNav = () => {
  let match = useRouteMatch();
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
          <Link to={`${match.url}/profile`}>
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

const IndexPage = () => {

  let match = useRouteMatch();


  return(
    <>
    <UserNav/>
    <Page>
      <Switch>
        <PrivateRoute path={`${match.path}/generator`}>
          <Generator/>
        </PrivateRoute>
        <PrivateRoute path={`${match.path}/profile`}>
          <UserProfile/>
        </PrivateRoute>
        <PrivateRoute path={`${match.path}`}>
          <CardMatrix/>
        </PrivateRoute>
      </Switch>
    </Page>
    </>
  );
}
export default IndexPage;