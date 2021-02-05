import React from 'react';
import ReactDOM from 'react-dom';
import App from './router/index';
import './css/stylesheet.css';
import {StoreContextProvider} from './contextreducer';

const AppWrapper = () => {
  return(
    <StoreContextProvider>
      <App/>
    </StoreContextProvider>
  );
}




ReactDOM.render(
 <AppWrapper/> 
  , document.getElementById('root'));