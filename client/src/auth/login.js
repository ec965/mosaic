import React, { useState, useEffect, useContext } from "react";
import { Button } from "../components/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormError, FormButton } from "./components";
import { Row } from "../components/layout";
import { getToken, redirect } from "../util/util.js";
import { postLogin } from "../config/api";
import { ACTION, StoreContext } from "../util/contextreducer";

const LoginForm = () => {
  const [serverErr, setServerErr] = useState(false);
  const [authErr, setAuthErr] = useState("");
  const { dispatch } = useContext(StoreContext);

  useEffect(() => {
    if (getToken()) {
      redirect("/home");
    }
  }, []);

  function login(username, password, rememberMe = false) {
    postLogin(username, password)
      .then((res) => {
        if (res.data.jwt) {
          let token = res.data.jwt;
          if (rememberMe) {
            localStorage.setItem("token", token);
          } else {
            sessionStorage.setItem("token", token);
          }
          dispatch({ type: ACTION.GET });
        }
        return res.data;
      })
      .then((data) => {
        if (data.message) {
          setAuthErr(data.message);
        } else {
          //redirect when login is confirmed
          redirect("/home");
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

            <Row className="flex-start">
              <p>Remember Me</p>
              <Field type="checkbox" name="rememberMe" />
            </Row>

            <Row className="form-buttons">
              <FormButton type="submit" disabled={isSubmitting}>
                Submit
              </FormButton>
              <Button onClick={handleDemoUser}>Demo User</Button>
            </Row>
          </Form>
        )}
      </Formik>

      {serverErr && (
        <FormError className="form-bottom-error">
          A server error has occured, please try again later.
        </FormError>
      )}
      {authErr && (
        <FormError className="form-bottom-error">{authErr}</FormError>
      )}
    </>
  );
};

export default LoginForm;
