import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import './custom-signup.css';
import '../scrollbar/custom-scrollbar.css';
import './footer.css';
import svg_logo from '../../imgs/certlify-svg-logo.png';
import github_logo from '../../imgs/mark-github-512.png';
import dsc_hero_image from '../../imgs/hero-dsc-about-unilag.png'

const headerContent = (
    <section className="signup-header-content-102020">
        <nav className="section-links">
            <ul className="home-links">
                <li><a href="/">Home</a>
                </li>
            </ul>
        </nav>
        <span className="logo"><img src={svg_logo} alt="Certlify logo"/></span>
    </section>
);

const footerContent = (
    <section className="signup-footer-content-102020">
        <BrowserRouter>    
        <p className="contribute">
            <span>Want to contribute?</span>
            <Link to="https://github.com/DSC-Unilag/cert">
                <img src={github_logo} alt="github logo"/>
            </Link>

        </p>
        <p className="built-by">Built by <Link to="https://dsc.community.dev/university-of-lagos/" target="_blank"> <span><img src={dsc_hero_image} alt="dsc unilag"/></span></Link></p>
        </BrowserRouter>
        <p className="empty"style={{width:"10%"}}></p>
    </section>
);

function SignUp({hideLoader}){
    useEffect(() => {
        ReactDOM.render(headerContent, document.getElementById('main-header'));
        ReactDOM.render(footerContent, document.getElementById('footer'));
        hideLoader();
    });
    
        return(
        <section className="sign-page-section">
            <h1 className="first-text">Sign up</h1>
            <p className="second-text">Hi there! Kindly enter the following details to create an account</p>

            <form id="form-input" className="form-input" onSubmit={() => {} /**false*/}>
                <input type="email" id="email" placeholder="Enter your e-mail" name="email" autoComplete="email"
                    minLength="4" required/>
                <p style={{display:"none"}} id="email-message" className="message"></p>
                <input type="text" id="organization" placeholder="Enter your personal/organization name"
                    name="organization" minLength="2" autoComplete="organization" required/>
                <input type="password" id="password" placeholder="Enter your password" name="password"
                    autoComplete="new-password" minLength="8" required/>
                <input type="password" id="con-password" placeholder="Confirm your password" name="con-password"
                    autoComplete="new-password" minLength="8" required/>
                <p style={{display:"none"}} id="password-message" className="message"></p>
                <button type="submit" onClick={() => {}/** matchpassword() **/} className="sign-log">
                    Sign up
                </button>
            </form>
            <p>Already have an account? <a id="login" href="/login">Login</a></p>
        </section>
    );
}

export default SignUp;