import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {checkAuth} from '../auth/functions';

const PrivateRoute = ({children, ...rest}) => {
  let auth=checkAuth();

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