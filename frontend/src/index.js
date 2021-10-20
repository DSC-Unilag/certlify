import React from 'react';
import ReactDOM from 'react-dom';
import './components/loader/loader.css';
import './animation/custom-animation.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
const App = React.lazy(() => import( './App'));
const Login = React.lazy(() => import('./components/login/login'));
const SignUp = React.lazy(() => import('./components/signup/signup'));
const Dashboard = React.lazy(() => import('./components/dashboard/dashboard'));
const Certificator = React.lazy(() => import('./components/certificate-generation/certificate-gen'));
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
  <React.Suspense fallback={
    <section className="loader">
        <div className="container-for-loader">
            <div className="large-circle">
            </div>
            <div className="inner-circle"></div>
            <div className="inner-circle"></div>
            <div className="inner-circle"></div>
            <div className="inner-circle"></div>
        </div>
    </section>
  }>
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
  </React.Suspense>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
