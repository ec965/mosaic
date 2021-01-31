import React from 'react';
import RegisterForm from './register';
import LoginForm from './login';
import {FormCard} from './components';

export const Login = () => {
  return(
    <FormCard title="Login">
      <LoginForm/>
    </FormCard>
  )
}
export const Register = () => {
  return(
    <FormCard title="Register">
      <RegisterForm/>
    </FormCard>
  )
}

