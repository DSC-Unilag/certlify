import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import HeaderDashboard from '../header-dashboard/header-dashboard';
import './dashboard.css';
import '../scrollbar/custom-scrollbar.css';


function Dashboard({hideLoader}){
    
    useEffect(() => {
        ReactDOM.render(<HeaderDashboard/>, document.getElementById('main-header'));
        hideLoader();   
    });
        return (
        <section>
        <section>
                <article className="main-dashboard">
                <section id="cards" className="landing-page-section">
            
                </section>
            
                <button id="add-cert">&#65291; Add Certificate</button>
            </article>
        </section>
        </section>
        );
    };

export default Dashboard;