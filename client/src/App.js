import React, { Component } from 'react';
import Main from './components/Main';
import '../src/css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: ''
    };
  }

  render() {

    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default App;
