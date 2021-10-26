import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './certificate-gen.css';
import './manage-func.css';
import '../../animation/custom-animation.css';
import {Link, BrowserRouter} from 'react-router-dom';
import '../scrollbar/custom-scrollbar.css';
import cropped_logo from '../../imgs/Group 298-edit.png';
import user_logo from '../../imgs/user.svg';
import tutorial_png from '../../imgs/tutorial.png';
import tutorial_png2 from '../../imgs/tutorial2.png';

const headerContent = (
    <section className="certificate-gen-header-content-102020">
        <section className="logo-section">
            <span className="code-logo"><img className="cropped-logo" src={cropped_logo} alt="logo icon"/></span>
            <div className="img-line"></div>
        </section>

        <span id="profile-image"><img id="user-image" src={user_logo} alt="user icon" /></span>

        <input type="checkbox" id="toggle-butt" />

        <label for="toggle-butt" className="bread-crumbs">
            <div className="bread-crumb"></div>
            <div className="bread-crumb"></div>
            <div className="bread-crumb"></div>
        </label>

        <nav className="section-links">
            <BrowserRouter>
            <ul className="home-links">
                <li><Link to="/">Home</Link>
                </li>
                <li className="gen-cert">
                    <Link to="/dashboard">Issued Certificates</Link>
                </li>
                <li>
                    <Link to="/logout">Logout</Link>
                </li>
            </ul>
            </BrowserRouter>
        </nav>

        <section className="volunteer-header">
            <h1 id="certificate-name"> </h1>
        </section>
    </section>
);

const footerContent = (
    <section>
        <BrowserRouter>
    <div className="icons-author hide">Icons made by <Link to="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</Link> from <Link to="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</Link></div>
        </BrowserRouter>
        <iframe title="hidden iframe" name="hidden-iframe" style={{display: "none"}} onLoad={() => {} /**parse()**/}></iframe>
    </section>
);

function Certificator({hideLoader}){

    useEffect(() => {
        ReactDOM.render(headerContent, document.getElementById('main-header'));
        ReactDOM.render(footerContent, document.getElementById('footer'));
        hideLoader();
    });

        return(
        <section>
        <section id="main-func" className="main-func-manage">
            <section id="cert-name" className="sign-page-section">
                <h1 className="first-text">Enter the certificate name</h1>
                <p className="second-text">Hi there! What would you want to name this certificate when issued?</p>

                <form className="form-input" onSubmit="return false">
                    <input type="text" id="certificate" placeHolder="e.g Certificate of Volunteer" name="certificate"
                        autocomplete="current-password" minLength={4} required/>

                    <p id="password-message" className="message"></p>
                    <button type="button" /**  onClick={first()} */className="sign-log">
                        Submit
                    </button>
                </form>
            </section>
            
            <section id="edit-cert" className="edit-cert-section hide">
                <BrowserRouter>
                <Link href="/createcertificate" className="close-button">&#x2716;</Link>
                </BrowserRouter>
                <article className="main-upload">
                    <div id="upload-div"style={{flexDirection: "column"}}>
                        <label for="file" className="upload-style">CHOOSE CERTIFICATE TEMPLATE IMAGE LESS THAN 2.5MB IN SIZE</label>
                        <input id="file" type="file" accept="image/*" onClick="cert_error.style.display='none'" onChange="loadFile(event)"/>
                        <p id="cert-error"style={{color:"red", display:"none"}}></p>
                    </div>
                    <div id="container">
                        <div id="canvas" className="apply-font"></div>
                    </div>
                </article>
            </section>
            <h3 id="prompt">None</h3>
            <section id="value-input" className="value-input-section hide">
                <section className="input-details">
                    <section>
                        <label for="full-name">Full name:</label>
                        <input className="apply-font" id="preview-test" type="text" autoComplete="name" name="fname"
                            minlength="3" maxLength="40" required placeHolder="Enter your name" onInput="mark()" />
                    </section>

                    <section className="fonts-section">
                        <label for="font-picker">Font family:</label>
                        <div id="font-picker" className="font-picker-dropdown">
                        </div>

                        <label for="font-size">Font-size:</label>

                        <section className="climb-section">
                            <button id="minus" onClick="decreaseValue()">&#45;</button>
                            <input type="number" id="number" name="font-size" value="16" min="16" max="56" required/>
                            <button id="plus" onClick="increaseValue()">&#43;</button>
                        </section>

                        <label for="color-code">Color:</label>
                        <input type="color" id="color" onchange="boundary.color=this.value;mark()"/>
                    </section>
                </section>

                <hr />

                <section className="border-section">
                    <BrowserRouter>
                        <Link to="" id="left_border">Left border</Link>
                        <Link to="" id="right_border">Right border</Link>
                        <Link to="" id="bottom">Text base</Link>
                        <Link to="" id="preview">Preview</Link>
                    </BrowserRouter>
                </section>

                <input id="done" type="submit" value="Submit"/>
            </section>

            <section id="add-emails" className="edit-cert-section hide">
                <article className="main-upload">
                    <section className="csv-tut-section">
                        <h2>CSV format Guide</h2>
                        <h3>There are two formats from which you can structure your CSV file to avoid any error.</h3>
                        <br/>
                        <br/>
                        <br/>
                        <h3>Email only format</h3>
                        <p>Using this format, the recepient would have the opportunity to specify what Name they want printed on thier certificate</p>
                        <p>If you have no experience with CSV files, we suggest you use a spreadsheet package and save as a CSV as explained below.</p>
                        <p>1. Start by entering the your title header on the first row and column as "email" shown below.</p>
                        <p>2. Next, enter all emails of those eligible for this certificate separating each on a new row.</p>
                        <img className="tut-img" src={tutorial_png} alt="CSV Format"/>
                        <br/>
                        <br/>
                        <br/>
                        <h3>Email and Name format</h3>
                        <p>This format should be used when the issuer already has the names assigned to the emails. The recipients of the certificates would be constrained to the name specified by the issuer.</p>
                        <p>1. Specify the emails as dictated in the first format's guide</p>
                        <p>2. Next, enter all the names of those eligible for this certificate against their email address</p>
                        <img className="tut-img" src={tutorial_png2} alt="CSV Format"/>
                    </section>
                    <div id="upload-div">
                        <form id="email-form" className="form" method="POST" enctype="multipart/form-data"
                            target="hidden-iframe">
                            <label for="csv-upload">Upload CSV file with the names of those eligible for the
                                certificate</label>
                            <input id="csv-upload" type="file" name="FileUpload" accept=".csv" className="custom-file"/>
                            <button className="icon">Submit</button>
                        </form>

                    </div>
                </article>
                <p id="error" style={{color:"red"}}></p>
                <p>You may skip, this process now and add later on your dashboard. Note that only user emails you have
                    uploaded would be eligile to generate</p>
                <button className="icon" type="button" onClick={() => {}/** next() */}>Skip</button>
            </section>

            <section id="cert-link" className="sign-page-section hide">
                <h1 className="first-text">Generated certificate link</h1>
                <p className="second-text">Hi there! you can share the link below to those eligible for the certificate</p>

                <form id="email-input" className="form-input" onSubmit={() => {} /** return false */}>
                    <input type="text" id="link" name="certificate" autoComplete="current-password" minLength={4}
                        readOnly={true} required/>

                    <p id="password-message" className="message"></p>
                    <button className="icon" onClick={() => {} /** CopyToClipBoard() */}><i className="copy"></i><span
                            id="text">Copy</span></button>
                    <button id="dashboard" className="icon" onClick={() => {}/*OpenWrapper()*/}><span id="text">Dashboard</span></button>
                    {/* <!-- <div className="share-container">
                        <div id="share-wrapper"className="share-wrapper">
                            <Link href="https://www.facebook.com/sharer/sharer.php?u=https%3A//certlify.com/" className="text">
                                <span className="icon-svg"><img src="/imgs/share-icons/facebook.svg"/></span>
                                Facebook
                            </Link>
                            <Link href="https://twitter.com/intent/tweet?text=Link%20to%20your%20certificates&url=https://certlify.com/" className="text sm twitter">
                                <span className="icon-svg"><img src="/imgs/share-icons/twitter.svg"/></span>
                                Twitter
                            </Link>
                            <Link href="whatsapp://send?text=The text to share!&url=https://certlify.com/" className="text">
                                <span className="icon-svg"><img src="/imgs/share-icons/whatsapp.svg"/></span>
                                WhatsApp
                            </Link>
                        </div>
                    </div> --> */}
                </form>
                {/* <!-- <Link id="goto" href="/dashboard">Go to dashboard</Link> --> */}
            </section>
        </section>
        </section>
        );
    }
export default Certificator;