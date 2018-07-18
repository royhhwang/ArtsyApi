import React, { Component } from 'react';
import '../css/Top.css';

class Top extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    render() {
        return (
            <div className="top-layer" id="top">
                <div>making slow and steady progress</div>
            </div>
        );
    }
}

export default Top;