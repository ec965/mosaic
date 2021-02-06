import React, { useState, useEffect } from "react";
import { Button } from "../components/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormError, FormButton } from "./components";
import { Row } from "../components/layout";
import { Redirect } from "react-router-dom";
import { getToken } from "../util/util.js";
import { postLogin } from "../config/api";

const LoginForm = () => {
  const [serverErr, setServerErr] = useState(false);
  const [authErr, setAuthErr] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (getToken()) {
      setLoggedIn(true);
    }
  }, []);

  function login(username, password, rememberMe = false) {
    postLogin(username, password)
      .then((res) => {
        if (res.data) {
          let token = res.data.jwt;
          if (rememberMe) {
            localStorage.setItem("token", token);
          } else {
            sessionStorage.setItem("token", token);
          }
        }
        return res.data;
      })
      .then((data) => {
        if (data.message) {
          setAuthErr(data.message);
        } else {
          setLoggedIn(true);
        }
      })
      .catch((error) => {
        console.error(error);
        if (error) {
          setServerErr(true);
        }
      });
  }

  const handleDemoUser = () => {
    login("demo_user", "test123");
  };

  return (
    <>
      {!loggedIn && (
        <Formik
          initialValues={{ username: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.username) {
              errors.username = "Please enter your username.";
            }
            if (!values.password) {
              errors.password = "Please enter your password.";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            login(values.username, values.password, values.rememberMe);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                className="form-field"
                type="username"
                name="username"
                placeholder="Username"
              />
              <ErrorMessage
                className="form-error"
                name="username"
                component="div"
              />

              <Field
                className="form-field"
                type="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage
                className="form-error"
                name="password"
                component="div"
              />

              <p>Remember Me</p>
              <Field type="checkbox" name="rememberMe" />

              <Row className="matrix">
                <FormButton type="submit" disabled={isSubmitting}>
                  Submit
                </FormButton>
                <Button onClick={handleDemoUser}>Demo User</Button>
              </Row>
            </Form>
          )}
        </Formik>
      )}
      {serverErr && (
        <FormError>
          A server error has occured, please try again later.
        </FormError>
      )}
      {authErr && <FormError>{authErr}</FormError>}
      {loggedIn && <Redirect to="/home" />}
    </>
  );
};

export default LoginForm;
