import React from 'react';
import {Page, Row} from '../components/layout';
import {Link} from 'react-router-dom';

const LandingPage = (props) => {
  return(
    <Page className="landing">
      <Row>
        <Link to="/login">
          <h3>Login</h3>
        </Link>
        <Link to="/register">
          <h3>Register</h3>
        </Link>
      </Row>
    </Page>
  );
}

export default LandingPage;