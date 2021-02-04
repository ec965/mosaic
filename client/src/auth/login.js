import React, {useState, useContext} from 'react';
import {Button} from '../components/button';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import axios from "axios";
import {APIURL, LOGIN} from '../config/api';
import {FormError, FormButton} from './components';
import {useAuth} from './functions';
import {Row} from '../components/layout';
import { UserContext } from '../router/index';

const LoginForm = () => {
  const [serverErr, setServerErr] = useState(false);
  const [authErr, setAuthErr] = useState("");
  const [currentUser, setCurrentUser] = useContext(UserContext);

  const alreadyLogged = useAuth("/home");

  const login = async (username, password) => {
    const res = await axios.post(APIURL + LOGIN, {
      username: username,
      password: password
    })
    if(res.data.token) {
      localStorage.setItem('user', JSON.stringify(res.data));
      setCurrentUser(username);
    }

    return res.data;
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
          login(values.username, values.password)
          .then((data) => {
            setAuthErr(data.message);
            setSubmitting(false);
          })
          .catch((error) => {
            setServerErr(true);
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
      </Formik>
      {serverErr && <FormError>"A server error has occured, please try again later.</FormError>}
      {authErr && <FormError>{authErr}</FormError>}
      {alreadyLogged}
    </>
  );
}

export default LoginForm;