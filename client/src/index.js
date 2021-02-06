import React from "react";
import ReactDOM from "react-dom";
import App from "./router/index";
import "./css/stylesheet.css";
import { StoreContextProvider } from "./util/contextreducer";

// import ImageGenerator from "./app/image.js";
// import RandomGenerator from "./app/random";

const AppWrapper = () => {
  return (
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  );
};

ReactDOM.render(
   <AppWrapper/>,
  // <div>
  //   {/* <ImageGenerator/> */}
  //   <RandomGenerator />
  // </div>,
  document.getElementById("root")
);
