import React from 'react';
import ReactDOM from 'react-dom';
import App from './router/index';
import './css/stylesheet.css';

// import {useLogin, useToken, useValidate, useUsername} from './auth/hooks';
// import {TokenContextProvider} from './auth/context';

// const Test = () => {
//   const login = useLogin();
//   const token = useToken();
//   const currentUser = useUsername();
//   const valid = useValidate();
  

//   return (
//     <div>
//       {console.log(valid)}
//       <h5>{currentUser}</h5>
//       <h5>{token}</h5>
//       <h5>{valid}</h5>
//       <button onClick={() => {
//         login('demo_user', 'test123');
//       }}>
//         Login
//       </button>
//     </div>
//   );
// }

// const App = () => {
//   return(
//     <TokenContextProvider>
//       <Test/>
//     </TokenContextProvider>
//   );
// }

ReactDOM.render(<App/>, document.getElementById('root'));