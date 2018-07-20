import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
import '../css/Preloader.css';

class Preloader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.state);
    }

    render() {

        const removePreload = this.state.loading ? 'layer-visible' : 'layer-fade';
        const now = 50;

        return (
            <div className={removePreload + " preload-layer"}>
                <div id='preload-center'>
                    <div id='preload-absolute'>
                        <ProgressBar now={now} label={`${now}%`} />
                    </div>
                </div>
            </div>
        )
    }
};

export default Preloader;