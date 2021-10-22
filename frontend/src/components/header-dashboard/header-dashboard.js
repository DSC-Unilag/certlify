import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import profile_image from '../../imgs/user.svg';
import cropped_logo from '../..//imgs/Group 298-edit.png';
import search_svg from '../../imgs/search.svg';


function HeaderDashboard(){
    return (
        <section className="header-content-102020">
                <section className="logo-section">
                    <span className="code-logo"><img className="cropped-logo" src={cropped_logo} alt="logo icon"/></span>
                    <div className="img-line"></div>
                </section>
            
                <span id="profile-image"><img id="user-image" src={profile_image} alt="user icon" /></span>
            
                <section className="search-section">
                    <input type="search" placeholder="Search" />
                    <button onClick={() => {}}><img src={search_svg} alt="" /></button>
                </section>
            
                <input type="checkbox" id="toggle-butt" />
            
                <label htmlFor="toggle-butt" className="bread-crumbs">
                    <div className="bread-crumb"></div>
                    <div className="bread-crumb"></div>
                    <div className="bread-crumb"></div>
                </label>
            
                <nav className="section-links">

                    <ul className="home-links">
                        <BrowserRouter>
                        <li><Link to="/">Home</Link>
                        </li>
                        <li className="gen-cert"><a href="/dashboard">Issued Certificates</a>
                            <hr className="active-cert"/>
                        </li>
                        <li>
                            <Link to="/logout">Logout</Link>
                        </li>
                        </BrowserRouter>
                    </ul>
                </nav>
            
                <section id="welcome" className="welcome-user">
                </section>
                </section>
    );
}

export default HeaderDashboard;