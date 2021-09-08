import React from 'react';
import './custom-login.css';
import '../..animation/custom-animation.css';
import {Loader} from '../loader/loader';


export class Login extends React.Component{
    render(){
        return(
            <section>
            <Loader/>
            <section className="sign-page-section">
            <h1 className="first-text">Login</h1>
            <p className="second-text">Hi there! Kindly enter your login details</p>

            <form id="email-input" className="form-input" onSubmit="return false">
                <input type="email" id="email" placeholder="Enter your e-mail" name="email" autoComplete="email"
                    minlength="4" required />
                <input type="password" id="password" placeholder="Enter your password" name="password"
                    autoComplete="current-password" minLength="8" required/>

                <p id="password-message" className="message"></p>
                <button id="submit" type="submit" onClick="" className="sign-log">
                    Login
                </button>
            </form>
            <p id="email-verification" className="message" style={{display:none}}></p>
            <button id="verify"type="button" onClick="emailer()" className="sign-log"style={{display:none}}>
                Verify
            </button>
            <p>forgot password? <a id="login" href="/emailrecovery">Password recovery</a></p>
            <p>Don't have an account? <a id="login" href="/signup">Sign up</a></p>
        </section>
            </section>
        );
    }
}