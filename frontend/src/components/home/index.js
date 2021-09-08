import React from 'react';
import './custom-main.css';
import logo from '../../imgs/diploma.svg';
import {Loader } from '../loader/loader';       
import '../../animation/custom-animation.css';

export class Home extends React.Component{
    render(){
        return(
        <section className="main">
            <Loader/>
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
    
                <a id="get-started" href="/dashboard">Get Started</a>
            </section>
        </section>
        );
    }
}