import React from 'react';
import ReactDOM from 'react-dom';
import App from './router/index';
import './css/stylesheet.css';
import {StoreContextProvider} from './contextreducer';
import Canvas from './app/pixelize.js'

const AppWrapper = () => {
  return(
    <StoreContextProvider>
      <App/>
    </StoreContextProvider>
  );
}




ReactDOM.render(
//  <AppWrapper/> 
<Canvas/>
  , document.getElementById('root'));