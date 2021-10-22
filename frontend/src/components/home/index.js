import React, { useEffect } from 'react';
import ReactDOM  from 'react-dom';
import './custom-main.css';
import '../scrollbar/custom-scrollbar.css';
import logo from '../../imgs/diploma.svg';
import { Link } from 'react-router-dom';
import svg_logo from '../../imgs/certlify-svg-logo.png';
import '../../animation/custom-animation.css';

const headerContent = (
    <section className="home-header-content-102020">
        <nav className="section-links">
            <ul className="home-links">
                <li><a href="/">Home</a>
                </li>
            </ul>
        </nav>
        <span className="logo"><img src={svg_logo} alt="Certlify logo"/></span>
    </section>
);

function Home(){       

    useEffect(() => {
        ReactDOM.render(headerContent, document.getElementById('main-header'));
    });

    return(

    <section className="main">
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
export default Home;