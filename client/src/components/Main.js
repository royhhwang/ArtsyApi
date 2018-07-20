import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import Top from './Top';
import ExCall from './ExCall';
import BTNav from './BTNav';
import Preloader from './Preloader';
import '../css/Main.css';

class Main extends Component {
  render() {
    return (
      <div>
        <Preloader />
        <BTNav />
        <Fade>
          <Top />
        </Fade>
        <Fade bottom>
          <ExCall />
        </Fade>
      </div>
    );
  }
}

export default Main;
