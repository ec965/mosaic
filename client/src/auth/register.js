import React, {useState} from 'react';
import axios from "axios";
import {APIURL, REGISTER} from '../config/api';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {FormError, FormButton} from './components';
import {useAuth} from './functions'
import {Redirect} from 'react-router-dom';

const RegisterForm= () => {
  const [nameErr, setNameErr] = useState(false);
  const [serverErr, setServerErr] = useState(false);
  const [registered, setRegistered] = useState(false);
  
  const alreadyLogged = useAuth('/home');
  
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
            setRegistered(true);
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
          <Form className="register">
            <Field className="form-field register" type="username" name="username" placeholder="Username"/>
            <ErrorMessage className="form-error" name="username" component="div"/>

            <Field className="form-field register" type="password" name="password" placeholder="Password"/>
            <ErrorMessage className="form-error" name="password" component="div"/>

            <Field className="form-field register" type="password" name="repassword" placeholder="Confirm Password"/>
            <ErrorMessage className="form-error" name="repassword" component="div"/>

            <FormButton classname="form-button" type="submit" disabled={isSubmitting}>
              Submit
            </FormButton>
          </Form>
        )}
      </Formik>
      {nameErr && <FormError>Error: That username is already taken, please choose a different username.</FormError>}
      {serverErr && <FormError>A server error has occured, please try again later.</FormError>}
      {alreadyLogged}
      {registered && <Redirect to='/login'/>}
    </>
  );
}

export default RegisterForm;