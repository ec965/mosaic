import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {Login, Register} from '../auth/index';
import LandingPage from '../pages/landing';
import PrivateRoute from './privateroute';
import UserProfile from '../pages/profile';
import Generator from '../pages/generator';
import CardMatrix from '../pages/home';
import {Page} from '../components/layout';
import UserNav from '../router/navbar';
import ProjectPage from '../pages/project';

const App = () =>{
  return(
    <Router>
    {/* // components */}

      <Switch>
        <PrivateRoute path="/project/:id">
          <UserNav/>
          <ProjectPage/>
        </PrivateRoute>
        <PrivateRoute path="/home">
          <UserNav/>
          <CardMatrix/>
        </PrivateRoute>
        <PrivateRoute path='/generator/:id'>
          <UserNav/>
          <Generator/>
        </PrivateRoute>
        <PrivateRoute path={`/generator`}>
          <UserNav/>
          <Generator/>
        </PrivateRoute>
        <PrivateRoute path={`/profile`}>
          <UserNav/>
          <UserProfile/>
        </PrivateRoute>

        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/">
          <LandingPage/>
        </Route>
      </Switch>
    </Router>
  );
}
export default App;