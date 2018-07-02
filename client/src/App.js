import React, { Component } from 'react';
import Main from './components/Main';
import TwitterLogin from 'react-twitter-auth';
import '../src/css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      user: null,
      token: ''
    };
  }

  onSuccess = (response) => {
    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      if (token) {
        this.setState({ authenticated: true, user: user, token: token });
      }
    });
  }

  onFail = (error) => {
    alert(error);
  };

  logout = () => {
    this.setState({ authenticated: false, token: '', user: null })
  };

  render() {
    let content = !!this.state.authenticated ?
      (
        <div>
          <p>Authenticated</p>
          <div>
            {this.state.user.email}
          </div>
          <div>
            <button onClick={this.logout} className="button">
              Log out!
              </button>
          </div>
        </div>
      ) :
      (
        <TwitterLogin loginUrl="http://localhost:3000/api/v1/auth/twitter"
          onFailure={this.onFail} onSuccess={this.onSuccess}
          requestTokenUrl="http://localhost:3000/api/v1/auth/twitter/reverse" />
      );

    return (
      <div className="App">
        <Main />
        {content}
      </div>
    );
  }
}

export default App;
