import React, { useContext } from "react";
import { StoreContext, ACTION } from "../util/contextreducer";

const Banner = ({ className, children, ...props }) => {
  const { state, dispatch } = useContext(StoreContext);

  // force an error for testing
  // useEffect (() => {
  //   dispatch({type: ACTION.SERVERERROR, payload: 500});
  // },[])

  const handleClick = (e) => {
    e.preventDefault();
    dispatch({ type: ACTION.RESETERROR });
  };
  return (
    <>
      {state.error && (
        <div className={`banner ${className}`} {...props}>
          <h3>{state.error}</h3>
          <i className="fas fa-times banner-close grey" onClick={handleClick} />
        </div>
      )}
    </>
  );
};

export default Banner;
