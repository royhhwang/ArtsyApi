import React, { Component } from 'react';
import Face from '../img/faceonly.png';
import '../css/Preloader.css';

class Preloader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 3000);
    }

    componentWillUnmount() {
        clearInterval(this.state);
    }

    render() {

        const removePreload = this.state.show ? 'layer-visible' : 'layer-fade';

        return (
            <div className={removePreload + " preload-layer"}>
                <div id='preload-center'>
                    <div id='preload-absolute'>
                        <img src={Face} alt="my face" className="img-absolute" />
                    </div>
                </div>
            </div>
        )
    }
};

export default Preloader;