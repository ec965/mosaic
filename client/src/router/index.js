import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./privateroute";

import { Login, Register } from "../auth/index";

import LandingPage from "../pages/landing";
import UserProfile from "../pages/profile";
import CardMatrix from "../pages/home";
import UserNav from "../router/navbar";
import ProjectPage from "../pages/project";
import RandomGenerator from "../app/random";
import ImageGenerator from "../app/image";

const App = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/project/:projectId">
          <UserNav />
          <ProjectPage />
        </PrivateRoute>

        <PrivateRoute path="/home">
          <UserNav />
          <CardMatrix />
        </PrivateRoute>

        <PrivateRoute path="/image/:projectId">
          <UserNav />
          <ImageGenerator />
        </PrivateRoute>

        <PrivateRoute path="/image">
          <UserNav />
          <ImageGenerator />
        </PrivateRoute>

        <PrivateRoute path="/generator/:projectId">
          <UserNav />
          <RandomGenerator />
        </PrivateRoute>

        <PrivateRoute path={`/generator`}>
          <UserNav />
          <RandomGenerator />
        </PrivateRoute>

        <PrivateRoute path={`/profile/:thisUser`}>
          <UserNav />
          <UserProfile />
        </PrivateRoute>

        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
