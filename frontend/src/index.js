import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './components/loader/loader.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const loader = document.querySelector('.loader');

const hideLoader = () => {
  loader.classList.toggle("zero-opacity");
  setTimeout(() => {
    loader.classList.toggle("hide");
  }, 350);
}

ReactDOM.render(
  <React.StrictMode>
    <App hideLoader = {hideLoader}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
