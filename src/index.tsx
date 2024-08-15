import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root-widget') as HTMLElement
);

const companySecretKey = document.getElementById('root-widget')?.getAttribute('data-secretkey');

sessionStorage.setItem('company_secret', companySecretKey ? companySecretKey : '1426790339a9cf3e4271c70ef2f92e7be87d7');

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <App companySecret={companySecretKey ? companySecretKey : '1426790339a9cf3e4271c70ef2f92e7be87d7'}/>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
