import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import Top from './Top';
import ExCall from './ExCall';
import NavBar from './NavBar';
import '../css/Main.css';

class Main extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Fade bottom>
          <Top />
          <ExCall />
        </Fade>
      </div>
    );
  }
}

export default Main;
