import React, {createContext, useReducer, useEffect} from 'react';
import {getToken} from './util.js';
import jwt_decode from 'jwt-decode';

export const StoreContext = createContext(null);
export const ACTION = {
  GET: "get",
};

// reducer
// gets the jwt info from local storage/ session storage
function reducer(state, action){
  switch (action.type){
    case ACTION.GET:
      // gets the token from local storage
      const token = getToken();
      // decodes the token and gets the username from the token
      if(token){
        const decoded = jwt_decode(token);

        return {username: decoded.user.username, id: decoded.user._id}
      } else {
        return state;
      }
    default:
      return state;
  }
}
// context provider wrapper
export const StoreContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, {username:null, id: null})
  
  useEffect(() => {
    dispatch({type: ACTION.GET});
  }, [dispatch])

  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  );
}