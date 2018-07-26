import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import '../css/ExCall.css';

class ExCall extends Component {
    constructor(props) {
        super();
        this.state = {
            response: '',
            winHeight: window.innerHeight
        };
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }


    callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    // handleScroll() {
    //     const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    //     const html = document.documentElement;
    //     const docHeight = html.clientHeight;
    //     const windowBottom = windowHeight + window.pageYOffset;

    //     if (windowBottom >= docHeight) {
    //         console.log('hit');
    //         document.getElementById('popup').style.display = "inline-block !important";
    //     }
    //     else {
    //         return (null);
    //     }
    // }

    render() {
        return (
            <div className="excall-layer" >
            </div>
        );
    };
};

export default ExCall;