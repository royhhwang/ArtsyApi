import React, { Component } from 'react';
import '../css/ExCall.css';


class ExCall extends Component {
    constructor(props) {
        super();
        this.state = {
            response: ''
        };
    }

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    render() {
        return (
            <div>
                <p>gonna throw api's in here</p>
            </div>
        );
    }
};

export default ExCall;