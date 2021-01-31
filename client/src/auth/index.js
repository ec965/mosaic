import React from 'react';
import RegisterForm from './register';
import LoginForm from './login';
import {FormCard} from './components';
import {Page, Row} from '../components/layout';

export const Login = () => {
  return(
    <Page>
      <Row>
        <FormCard title="Login">
          <LoginForm/>
        </FormCard>
      </Row>
    </Page>
  )
}
export const Register = () => {
  return(
    <Page>
      <Row>
        <FormCard title="Register">
          <RegisterForm/>
        </FormCard>
      </Row>
    </Page>
  )
}

