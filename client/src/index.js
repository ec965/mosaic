import React from 'react';
import ReactDOM from 'react-dom';
import {Register, Login} from './auth';

const App = () => {
  return(
    <div>
      <Register/>
      <Login/>
    </div>
  );
}
ReactDOM.render(<App/>, document.getElementById('root'));