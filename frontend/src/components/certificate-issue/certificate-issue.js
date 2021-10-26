import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './certificate-gen.css';
import './manage-func.css';
import '../../animation/custom-animation.css';
import {Link, BrowserRouter} from 'react-router-dom';

const headerContent = (
    <section>
        
    </section>
);

function CertificateIssue(){
    return (
        <section className="">
        <section id="cert-name" className="sign-page-section">
            <h1 className="first-text">Enter Bearers name</h1>
            <p className="second-text">Hi there! Who is this certificate being issued to?</p>

            <form className="form-input" onSubmit="return false">
                <input type="text" id="holdername" placeHolder="Name of Holder" name="Name of Holder"
                    autoComplete="current-password" minLength="4" required/>

                <p id="password-message" className="message"></p>
                <button id="done" className="sign-log">
                    Generate
                </button>
            </form>

        </section>
        <section id="generate" className="sign-page-section" style={{display:"none"}}>
            <h1 className="first-text">A certificate has already been generted for this account. You may regenerate here
            </h1>

            <button id="regenerate" className="sign-log">
                Generate
            </button>

        </section>
        <div id="container">
            <div id="font-picker" className="font-picker-dropdown" style={{display:"none"}}>
            </div>
            <div id="canvas"></div>
        </div>
    </section>
    );
}

export default CertificateIssue;