import React, { Component } from 'react';
import Groceries from './Groceries';
import ExCall from './ExCall';
import '../css/Main.css';

class Main extends Component {
  render() {
    return (
      <div>
        <Groceries />
        <ExCall />
      </div>
    );
  }
}

export default Main;
