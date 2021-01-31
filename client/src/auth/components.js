import React,{useState} from 'react';
import {Redirect} from 'react-router-dom';
import {logout} from './functions';

export const FormCard = (props) => {
  return(
    <div className="form-card">
      <h3 className="form-title">{props.title}</h3>
      {props.children}
    </div>
  )
}
export const FormError = (props) => {
  return(
    <p>{props.children}</p>
  )
}

export const FormLabel = (props) => <label className="form-label">{props.children}</label>

export const FormButton = (props) => <button className="form-button" type="submit" disabled={props.disabled}>{props.children}</button>

export const Logout = (props) => {
  const [loggedOut, setLoggedOut] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    logout();
    setLoggedOut(true);
  }

  return(
    <>
      <h4 className="logout link" onClick={handleClick}>
        {props.children}
      </h4>
      {loggedOut && <Redirect to="/"/>}
    </>
  );
}