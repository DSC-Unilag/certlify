import './App.css';
import './loader.css';
import './footer.css';
import './animations.css';

function App() {
  return (
    <div className="App">
      <span className="loader">
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

    <header>
        <span className="logo"><img src="/imgs/Group 297.png" alt="Certlify logo" /></span>
    </header>

    <main>
        <span>
            <img src="/imgs/diploma.svg" alt="certificate" />
        
            <div className="custom-cir cir-left">
            </div>
            <div className="custom-cir">
            </div>

            <div className="custom-ellipse">
            </div>
        </span>

        <section className="landing-page-section">
            <h1>Welcome to the Certlify!
                <br/>
                <i>Certificates on the go.</i>
            </h1>
            <p>Easily upload and generate certificates at your convenience, anywhere and anytime with just your email &#128231;.</p>
            <p>Click on the button below to get started!</p>

            <a id="get-started" href="/dashboard">Get Started</a>
        </section>
    </main>
    
    <footer>
        <p className="contribute">
            <span>Want to contribute?</span>    
            <a href="https://github.com/DSC-Unilag/cert" target="_blank" rel="noreferrer">
                <img src="/imgs/mark-github-512.png" alt="github logo"/>
            </a>
        </p>
        <p className="built-by">Built by <a href="https://dsc.community.dev/university-of-lagos/"target="_blank" rel="noreferrer"> <span><img src="/imgs/hero-dsc-about-unilag.png" alt="dsc unilag"/></span></a></p>
        <p className="empty"></p>
    </footer>
    </div>
  );
}

export default App;
