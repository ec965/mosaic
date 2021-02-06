import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormError, FormButton } from "./components";
import { Redirect } from "react-router-dom";
import { postRegister } from "../config/api";
import { getToken } from "../util/util";

const RegisterForm = () => {
  const [nameErr, setNameErr] = useState(false);
  const [serverErr, setServerErr] = useState(false);
  const [registered, setRegistered] = useState(false);

  const register = async (username, password) => {
    const res = postRegister(username, password);
    return res;
  };

  useEffect(() => {
    if (getToken()) {
      setRegistered(true);
    }
  }, []);

  return (
    <>
      <Formik
        initialValues={{ username: "", password: "", repassword: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.username) {
            errors.username = "Required";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          if (values.password !== values.repassword) {
            errors.repassword = "Passwords do not match.";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          register(values.username, values.password)
            .then((data) => {
              setSubmitting(false);
              setRegistered(true);
              // redirect to login page
            })
            .catch((error) => {
              if (error.response.status === 401) {
                values.username = "";
                values.password = "";
                values.repassword = "";
                setNameErr(true);
              } else {
                setServerErr(true);
              }
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="register">
            <Field
              className="form-field register"
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
              className="form-field register"
              type="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage
              className="form-error"
              name="password"
              component="div"
            />

            <Field
              className="form-field register"
              type="password"
              name="repassword"
              placeholder="Confirm Password"
            />
            <ErrorMessage
              className="form-error"
              name="repassword"
              component="div"
            />

            <FormButton
              classname="form-button"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </FormButton>
          </Form>
        )}
      </Formik>
      {nameErr && (
        <FormError>
          Error: That username is already taken, please choose a different
          username.
        </FormError>
      )}
      {serverErr && (
        <FormError>
          A server error has occured, please try again later.
        </FormError>
      )}
      {registered && <Redirect to="/login" />}
    </>
  );
};

export default RegisterForm;
