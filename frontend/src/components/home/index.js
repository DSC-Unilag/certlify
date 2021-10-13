import React from 'react';
import './custom-main.css';
import '../scrollbar/custom-scrollbar.css';
import logo from '../../imgs/diploma.svg';
import { BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import svg_logo from '../../imgs/certlify-svg-logo.png';
import '../../animation/custom-animation.css';
import { SignUp } from '../signup/signup';

export class Home extends React.Component{
    render(){
        return(
    <BrowserRouter>
        <Switch>
        <Route path="/signup" component={SignUp}/>

    <section className="main">
            <header>
      <nav class="section-links">
          <ul class="home-links">
              <li><a href="/index.html">Home</a>
              </li>
          </ul>
      </nav>
      <span class="logo"><img src={svg_logo} alt="Certlify logo"/></span>
  </header>
            <span>
                <img src={logo} alt="certificate"/>
            
                <div className="custom-cir cir-left">
                </div>
                <div className="custom-cir">
                </div>
    
                <div className="custom-ellipse">
                </div>
            </span>
    
            <section className="landing-page-section">
                <h1>Welcome to Certlify!
                    <br/>
                    <i>Certificates on the go.</i>
                </h1>
                <p>Easily upload and generate certificates at your convenience, anywhere and anytime with just your email &#128231;.</p>
                <p>Click on the button below to get started!</p>
                <Link id="get-started" to="/signup">Get Started</Link>
            </section>

        </section>
        </Switch>
        </BrowserRouter>
        );
    }
}