import { Component } from 'react';
var request = require('superagent');

var clientID = process.env.REACT_APP_CLIENT_ID,
    clientSecret = process.env.REACT_APP_CLIENT_SECRET,
    apiUrl = 'https://api.artsy.net/api/tokens/xapp_token',
    xappToken;

class Token extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: []
        }
        this.handleToken = this.handleToken.bind(this);
    }

    componentDidMount() {
        this.handleToken();
    }

    handleToken() {
        request
            .post(apiUrl)
            .send({ client_id: clientID, client_secret: clientSecret })
            .then(res => {
                xappToken = res.body.token;
                this.state.token.push(xappToken);
            });
    }
    render() {
        const stupidToken = ({ value: this.state.token });
        return null;
    }
}

export default Token;