import React, { createContext, useReducer, useEffect } from "react";
import { getToken } from "./util.js";
import jwt_decode from "jwt-decode";
import Banner from "../components/banner";

export const StoreContext = createContext(null);
export const ACTION = {
  GET: "get",
  LOGOUT: "logout",
  SERVERERROR: "500",
  BADREQUEST: "400",
  RESETERROR: "resetErr",
};

// reducer
// gets the jwt info from local storage/ session storage
function reducer(state, action) {
  switch (action.type) {
    case ACTION.GET:
      // gets the token from local storage
      const token = getToken();
      // decodes the token and gets the username from the token
      if (token) {
        const decoded = jwt_decode(token);

        return { username: decoded.user.username, id: decoded.user._id };
      } else {
        return state;
      }
    case ACTION.LOGOUT:
      return initialState;
    case ACTION.SERVERERROR:
      return {
        ...state,
        error: `A server error has occured: ${action.payload}`,
      };
    case ACTION.BADREQUEST:
      return { ...state, error: `Bad request: ${action.payload}` };
    case ACTION.RESETERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}

const initialState = {
  username: null,
  id: null,
  error: null,
};
// context provider wrapper
export const StoreContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: ACTION.GET });
  }, [dispatch]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <Banner />
      {children}
    </StoreContext.Provider>
  );
};

// use to dispatch the error action when an error occurs during a fetch request
export function dispatchError(err, dispatch) {
  console.error(err);
  if (err.status <= 499) dispatch({ type: ACTION.BADREQUEST, payload: err });
  else dispatch({ type: ACTION.SERVERERROR, payload: err });
}
