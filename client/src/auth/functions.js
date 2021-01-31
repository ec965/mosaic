import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
export const logout = () => {
  localStorage.removeItem('user');
}

// checks local storage for jwt
export const checkAuth = () =>{
  let auth = localStorage.getItem('user');
  let user = JSON.parse(auth);

  if (user){
    if(user.token){
      return true;
    }
  }
  return false;
}

// checks auth and returns a redirect component to profile is alreayd logged in
export const useAuth = () =>{
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect (()=> {
    setLoggedIn(checkAuth());
  }, [])
  return(
    <>
      {loggedIn && <Redirect to="/profile"/>}
    </>
  );
}
