import React from 'react';
import ReactDOM from 'react-dom';
import './components/loader/loader.css';
import App from './App';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { Login } from './components/login/login';
import { SignUp } from './components/signup/signup';
import { Dashboard } from './components/dashboard/dashboard';
import reportWebVitals from './reportWebVitals';
import { Certificator } from './components/certificate-generation/certificate-gen';
const loader = document.querySelector('.loader');

const hideLoader = () => {
  if(loader.classList.contains("zero-opacity") === false){
    loader.classList.add("zero-opacity");
  }
  setTimeout(() => {
    if(loader.classList.contains("hide") === false){
      loader.classList.add("hide");
    }
  }, 350);
}

ReactDOM.render(
  <BrowserRouter>
  <Switch>
    <React.StrictMode>
    <Route exact path="/">
      <App hideLoader = {hideLoader}/>
    </Route>
    <Route path="/signup" render={(props) => <SignUp {...props} hideLoader={hideLoader} />}/>
    <Route path="/login" render={(props) => <Login {...props} hideLoader={hideLoader} />} />
    <Route path="/dashboard" render={(props) => <Dashboard {...props} hideLoader={hideLoader} />} />
    <Route path="/certificate-gen" render={(props) => <Certificator {...props} hideLoader={hideLoader} />} />
    </React.StrictMode>
  </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
