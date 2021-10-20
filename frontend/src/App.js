import Home from './components/home/index.js';
import './components/loader/loader.css';
import React from 'react';

class App extends React.Component {
  componentDidMount() {
    window.onload = () => this.props.hideLoader();
  }

  render() {
    return (  
      <section>
        <Home />
      </section>
    );
  }
}

export default App;