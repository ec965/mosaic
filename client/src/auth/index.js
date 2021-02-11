import React from "react";
import RegisterForm from "./register";
import LoginForm from "./login";
import UpdatePasswordForm from './updatepassword';
import { FormCard } from "./components";
import { Page, Column } from "../components/layout";
import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <AuthPage
      title="Login"
      altLink="/register"
      altText="Don't have an account?"
    >
      <LoginForm />
    </AuthPage>
  );
};
export const Register = () => {
  return (
    <AuthPage
      title="Register"
      altLink="/login"
      altText="Already have an account?"
    >
      <RegisterForm />
    </AuthPage>
  );
};

export const UpdatePassword = () => {
  return(
    <AuthPage
      title="Update Password"
      altLink="/home"
      altText="Click here to return to home without updating your password."
    >
      <UpdatePasswordForm/>
    </AuthPage>
  )
}

const AuthPage = ({children, altLink, altText, title}) => {
  return(
    <Page>
      <Column>
        <FormCard title={title}>
          {children}
        </FormCard>
        <div className="auth-bottom">
          <Link to={altLink}>
            <p className="italic small">{altText}</p>
          </Link>
        </div>
      </Column>
    </Page>
  );
}