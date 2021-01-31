import React, {useState} from 'react';
import {Formik, Form, Field} from 'formik';
import axios from "axios";
import {APIURL, LOGIN} from '../config/api';
import {FormError} from './components';

const LoginForm = () => {
  const [serverErr, setServerErr] = useState(false);

  const login = async (username, password) => {
    const res = await axios.post(APIURL + LOGIN, {
      username: username,
      password: password
    })
    if(res.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(res.data))
    }

    return res.data;
  }

  return(
    <>
      <Formik
        initialValues={{username: '', password: ''}}
        // validate={values=> {
        //   const errors = {};
        //   if (!values.username){
        //     errors.username = 'Required';
        //   }
        //   if (!values.password){
        //     errors.password = 'Required';
        //   }
        //   return errors;
        // }}
        onSubmit={(values, {setSubmitting}) => {
          login(values.username, values.password)
          .then((data) => {
            setSubmitting(false);
            // redirect to user-land
          })
          .catch((error) => {
            setServerErr(true);
            setSubmitting(false);
          });

        }}
      >
        {({isSubmitting}) => (
          <Form>
            <label>Username</label>
            <Field type="username" name="username"/>
            {/* <ErrorMessage name="username" component="div"/> */}

            <label>Password</label>
            <Field type="password" name="password"/>
            {/* <ErrorMessage name="password" component="div"/> */}

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      {serverErr && <FormError>"A server error has occured, please try again later.</FormError>}
    </>
  );
}

export default LoginForm;