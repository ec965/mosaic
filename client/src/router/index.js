import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {Login, Register} from '../auth/index';
import LandingPage from '../pages/landing';
import PrivateRoute from './privateroute';
import IndexPage from '../pages';

const App = () =>{
  return(
    <Router>
    {/* // components */}

      <Switch>
        <PrivateRoute path="/app">
          <IndexPage/>
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