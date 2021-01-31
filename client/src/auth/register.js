import React, {useState} from 'react';
import axios from "axios";
import {APIURL, REGISTER} from '../config/api';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {FormError} from './components';

const RegisterForm= () => {
  const [nameErr, setNameErr] = useState(false);
  const [serverErr, setServerErr] = useState(false);
  const register = async (username,password) => {
    const res = await axios.post(APIURL + REGISTER, {
      username: username,
      password: password
    });
    return res;
  }

  return(
    <>
      <Formik
        initialValues={{username: '', password: '', repassword: ''}}
        validate={(values)=> {
          const errors = {};
          if (!values.username){
            errors.username = 'Required';
          }
          if (!values.password){
            errors.password = 'Required';
          }
          if (values.password !== values.repassword){
            errors.repassword = 'Passwords do not match.';
          }
          return errors;
        }}
        onSubmit={(values, {setSubmitting}) => {
          register(values.username, values.password)
          .then((data) => {
            setSubmitting(false);
            // redirect to login page
          })
          .catch((error) => {
            if(error.response.status === 401){
              values.username='';
              values.password='';
              values.repassword='';
              setNameErr(true);
            }
            else {
              setServerErr(true);
            }
            setSubmitting(false);
          });
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <label>Username</label>
            <Field type="username" name="username"/>
            <ErrorMessage name="username" component="div"/>

            <label>Password</label>
            <Field type="password" name="password"/>
            <ErrorMessage name="password" component="div"/>
            <label>Re-type Password</label>
            <Field type="password" name="repassword"/>
            <ErrorMessage name="repassword" component="div"/>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      {nameErr && <FormError>Error: That username is already taken, please choose a different username.</FormError>}
      {serverErr && <FormError>A server error has occured, please try again later.</FormError>}
    </>
  );
}

export default RegisterForm;