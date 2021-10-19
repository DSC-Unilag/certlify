import React from 'react';
import './custom-main.css';
import '../scrollbar/custom-scrollbar.css';
import logo from '../../imgs/diploma.svg';
import { Link } from 'react-router-dom';
import svg_logo from '../../imgs/certlify-svg-logo.png';
import '../../animation/custom-animation.css';

export function Home(){
        return(

    <section className="main">
            <header>
      <nav className="section-links">
          <ul className="home-links">
              <li><a href="/index.html">Home</a>
              </li>
          </ul>
      </nav>
      <span className="logo"><img src={svg_logo} alt="Certlify logo"/></span>
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
        );
    }