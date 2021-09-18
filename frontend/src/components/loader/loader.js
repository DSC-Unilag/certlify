import React from 'react';
import './loader.css';
import '../../animation/custom-animation.css';

export class Loader extends React.Component{
    constructor(props) {
        super(props);
        this.ShowLoader = this.ShowLoader.bind(this);
        this.HideLoader = this.HideLoader.bind(this);
     }
    
     
     HideLoader() {
         this.setState({containerLoad: '.loader .zero-opacity'});
         setTimeout(() => {
             this.setState({containerLoad: '.loader .zero-opecity .hide'});
            }, 350);
        }
        
        ShowLoader() {
            this.setState({containerLoad: ".loader"});
            this.setState({containerLoad: ".loader"});  
        }
        
        render(){
            return(
                <section>
                <span className=".loader">
                    <div className="container-for-loader">
                        <div className="large-circle">
                        </div>
                        <div className="inner-circle"></div>
                        <div className="inner-circle"></div>
                        <div className="inner-circle"></div>
                        <div className="inner-circle"></div>
                    </div>
                </span>
                <div className="ellipse-curve top-left">
                    <div className="first-line">
                    </div>
                    <div className="second-line">
                    </div>
                    <div className="third-line">
                    </div>
                </div>

                <div className="ellipse-curve">
                    <div className="first-line">
                    </div>
                    <div className="second-line">
                    </div>
                    <div className="third-line">
                    </div>
                </div>
            </section>
        );
    }

    componentDidMount() {
        window.onload = () => {
            return this.ShowLoader;
        };
    }
    componentDidUpdate() {
        window.onload = () => {
            return this.ShowLoader;
        };
    }
}