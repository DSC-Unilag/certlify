import React from 'react';
import './footer.css';


export class Footer extends React.Component{
    render(){
        return(
        <footer>
            <p className="contribute">
                <span>Want to contribute?</span>    
                <a href="https://github.com/DSC-Unilag/cert" target="_blank" rel="noreferrer">
                    <img src="/imgs/mark-github-512.png" alt="github logo"/>
                </a>
            </p>
            <p className="built-by">Built by <a href="https://dsc.community.dev/university-of-lagos/" target="_blank" rel="noreferrer"> <span><img src="/imgs/hero-dsc-about-unilag.png" alt="dsc unilag" /></span></a></p>
            <p className="empty"></p>
        </footer>
        );
    }
}