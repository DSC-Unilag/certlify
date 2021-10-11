import React from 'react';
import './dashboard.css';
import '../..animation/custom-animation.css';

export class Dashboard extends React.Component{
    render(){
        return (
            <section>
        <section>
            <header>
                <section className="logo-section">
                    <span className="code-logo"><img className="cropped-logo" src="/imgs/Group 298-edit.png" alt="logo icon"/></span>
                    <div className="img-line"></div>
                </section>
            
                <span id="profile-image"><img id="user-image" src="/imgs/user.svg" alt="user icon" /></span>
            
                <section className="search-section">
                    <input type="search" placeholder="Search" />
                    <button onClick=""><img src="/imgs/search.svg" alt="" /></button>
                </section>
            
                <input type="checkbox" id="toggle-butt" />
            
                <label for="toggle-butt" className="bread-crumbs">
                    <div className="bread-crumb"></div>
                    <div className="bread-crumb"></div>
                    <div className="bread-crumb"></div>
                </label>
            
                <nav className="section-links">
                    <ul className="home-links">
                        <li><a href="/">Home</a>
                        </li>
                        <li className="gen-cert"><a href="/dashboard">Issued Certificates</a>
                            <hr className="active-cert"/>
                        </li>
                        <li>
                            <a href="/logout">Logout</a>
                        </li>
                    </ul>
                </nav>
            
                <section id="welcome" className="welcome-user">
                </section>
                </header>
                <article className="main-dashboard">
                <section id="cards" className="landing-page-section">
            
                </section>
            
                <button id="add-cert">&#65291; Add Certificate</button>
            </article>
        </section>
            </section>
        );
    };
};