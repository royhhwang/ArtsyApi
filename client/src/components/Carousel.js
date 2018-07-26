import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import Pic1 from '../img/blackwp.jpg';
import Pic2 from '../img/grass.jpg';
import Pic3 from '../img/sky.jpg';
import Pic4 from '../img/spotlight.jpg';
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
                >
                    <Carousel.Item>
                        <img width={900} height={500} alt="900x500" src={Pic3} />
                        {/* <Carousel.Caption>
                            <h3>First photo</h3>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={900} height={500} alt="900x500" src={Pic2} />
                        {/* <Carousel.Caption>
                            <h3>Second photo</h3>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={900} height={500} alt="900x500" src={Pic1} />
                        {/* <Carousel.Caption>
                            <h3>Third photo</h3>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={900} height={500} alt="900x500" src={Pic4} />
                        {/* <Carousel.Caption>
                            <h3>Fourth photo</h3>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}

export default Top;