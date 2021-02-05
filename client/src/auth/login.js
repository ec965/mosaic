import React, {useState, useEffect} from 'react';
import {Button} from '../components/button';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {FormError, FormButton} from './components';
import {Row} from '../components/layout';
import axios from 'axios';
import {APIURL, LOGIN} from '../config/api';
import {Redirect} from 'react-router-dom';

const LoginForm = () => {
  const [serverErr, setServerErr] = useState(false);
  const [authErr, setAuthErr] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('token') && localStorage.getItem('username')){
      setLoggedIn(true);
    }
  },[])

  async function login(username, password, rememberMe = false){
    let res = await axios.post(APIURL + LOGIN,{
      username: username,
      password: password
    })
    if(res.data){
      let token = res.data.jwt;
      let currentUser = res.data.username

      if(rememberMe){
        localStorage.setItem('token', token);
        localStorage.setItem('username', currentUser);

      } else {
        sessionStorage.setItem('username', currentUser);
        sessionStorage.setItem('token', token);
      }
      setLoggedIn(true);
      // redirect
    }
  }


  const handleDemoUser = () => {
    login('demo_user', 'test123')
    .then((data) => {
      setAuthErr(data.message);
    })
    .catch((error) => {
      setServerErr(true);
    });
  }

  return(
    <>
      {! loggedIn && 
      <Formik
        initialValues={{username: '', password: ''}}
        validate={values=> {
          const errors = {};
          if (!values.username){
            errors.username = 'Please enter your username.';
          }
          if (!values.password){
            errors.password = 'Please enter your password.';
          }
          return errors;
        }}
        onSubmit={(values, {setSubmitting}) => {
          login(values.username, values.password, values.rememberMe)
          .then((data) => {
            setAuthErr(data.message);
            setSubmitting(false);
          })
          .catch((error) => {
            console.error(error);
            if(error){
              setServerErr(true);
            }
            setSubmitting(false);
          });

        }}
      >
        {({isSubmitting}) => (
          <Form>
            <Field className="form-field" type="username" name="username" placeholder="Username"/>
            <ErrorMessage className="form-error" name="username" component="div"/>

            <Field className="form-field" type="password" name="password" placeholder="Password"/>
            <ErrorMessage className="form-error" name="password" component="div"/>

            <p>Remember Me</p>
            <Field type="checkbox" name="rememberMe"/>

            <Row className='matrix'>
              <FormButton type="submit" disabled={isSubmitting}>
                Submit
              </FormButton>
              <Button onClick={handleDemoUser}>
                Demo User 
              </Button> 
            </Row>
          </Form>
        )}
      </Formik>}
      {serverErr && <FormError>A server error has occured, please try again later.</FormError>}
      {authErr && <FormError>{authErr}</FormError>}
      {loggedIn && <Redirect to="/home"/>}
    </>
  );
}

export default LoginForm;