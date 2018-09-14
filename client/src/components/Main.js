import React, { Component } from 'react';
import BTNav from './BTNav';
import Preloader from './Preloader';
import Dataset from './Dataset';
import '../css/Main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    this.setState({ loaded: !this.state.loaded });
  }

  render() {
    const secondWave = this.state.loaded ?
      <div className="main-layer" id="top">
        <BTNav />
        <Dataset />
      </div>
      :
      null
      ;


    return (
      <div>
        <Preloader />
        {secondWave}
      </div>
    )
  }
}

export default Main;
