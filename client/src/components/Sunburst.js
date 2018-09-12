import React, { Component } from 'react';
import '../css/Sunburst.css';
import data from './Data';

class Sunburst extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    render() {
        return (
            <div className="top-layer" id="top">
                <h1>Featured</h1>
            </div>
        );
    }
}

export default Sunburst;