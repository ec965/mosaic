import React from 'react';
import {getToken} from '../util.js';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({children, ...rest}) => {
  let token = getToken();
  let auth;

  if (token){
    auth=true;
  }

  return(
    <Route
      {...rest}
      render={({location}) =>
        auth ? (
          children
        ) : (
          <Redirect 
            to={{
              pathname:"/",
              state: {from:location}
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;