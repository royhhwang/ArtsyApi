import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
import '../css/Preloader.css';

let now = 0;

class Preloader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            percent: now,
            active: false
        }
    }

    componentDidMount() {
        let i = 0;
        const intervalId = setInterval(() => {
            if (i === 99) {
                clearInterval(intervalId);
            };
            i++;
            now++;
            this.setState({ percent: now });
            if (now === 100) {
                setTimeout(() => this.setState({ active: true }), 800);
                setTimeout(() => this.setState({ loading: false }), 2500);
            }
        }, 10);
    }

    componentWillUnmount() {
        clearInterval(this.state);
    }

    render() {

        const removePreload = this.state.loading ? 'layer-visible' : 'layer-fade';
        const welcomeMsg = this.state.active ? 'loader' : 'no-msg';
        const removeLoad = this.state.active ? 'no-bar' : '';

        return (
            <div className={removePreload + " preload-layer"}>
                <div id='preload-center'>
                    <div id='preload-absolute'>
                        <ProgressBar active striped now={now} label={`${now}%`} className={removeLoad} />
                        <div className={welcomeMsg}>Welcome</div>
                    </div>
                </div>
            </div>
        )
    }
};

export default Preloader;