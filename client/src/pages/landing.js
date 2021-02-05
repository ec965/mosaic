import React from 'react';
import {Page, Row, Column} from '../components/layout';
import {Link} from 'react-router-dom';
import PixelApp from '../app/app';

const LandingPage = (props) => {
  return(
    <Page> 
      <Column className="center">
        <Link to="/login">
          <h3 className="landing-text">Login</h3>
        </Link>
        <Row>
          <a href="https://enochchau.com">
            <h3 className="landing-text vertical-text">About</h3>
          </a>
          <PixelApp 
            dimension={10} 
            pixelSize={50}
          />
          <a href="https://github.com/ec965/user-land">
            <h3 className="landing-text vertical-text">GitHub</h3>
          </a>
        </Row>
        <Link to="/register">
          <h3 className="landing-text">Register</h3>
        </Link>
      </Column>
    </Page>
  );
}

export default LandingPage;