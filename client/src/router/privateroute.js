import React from 'react';
import {getToken} from '../util.js';
import {Route, Redirect} from 'react-router-dom';

// import axios from 'axios';
// import { APIURL, VALIDATE } from '../config/api.js';

// async function validate() {
//   const token = getToken();
//   try{
//     let res = await axios.post(APIURL + VALIDATE,
//       {data:'data'},
//       {headers: {"Authorization": `Bearer ${token}`}}
//     )
//     if (res.status === 200) return true;

//   } catch(error){
//     return false;
//   }
// }

const PrivateRoute = ({children, ...rest}) => {
  function validate(){
    if(!getToken()){
      return false;
    }
    return true;
  }

  return(
    <Route
      {...rest}
      render={({location}) =>
        validate() ? (
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