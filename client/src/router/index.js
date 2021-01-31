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

const App = () =>{
  return(
    <Router>
    {/* // components */}

      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <PrivateRoute path="/profile">
          <UserProfile/>
        </PrivateRoute>
        <Route path="/">
          <LandingPage/>
        </Route>
      </Switch>
    </Router>
  );
}
export default App;