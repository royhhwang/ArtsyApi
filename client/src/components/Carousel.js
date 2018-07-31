import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import Pic3 from '../img/sky.jpg';
import '../css/Carousel.css';

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
                <Carousel
                    interval={null}
                    id="carousel"
                    indicators={null}
                    controls={null}
                >
                    <Carousel.Item>
                        <img width={900} height={500} alt="900x500" src={Pic3} />
                        {/* <Carousel.Caption>
                            <h3>First photo</h3>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}

export default Top;