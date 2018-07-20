import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import Pic1 from '../img/blackwp.jpg';
import Pic2 from '../img/grass.jpg';
import Pic3 from '../img/sky.jpg';
import Pic4 from '../img/spotlight.jpg';
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
                <Carousel>
                    <Carousel.Item>
                        <img width={900} height={500} alt="900x500" src={Pic1} />
                        <Carousel.Caption>
                            <h3>First photo</h3>
                            <p>Never gonna give you up</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={900} height={500} alt="900x500" src={Pic2} />
                        <Carousel.Caption>
                            <h3>Second photo</h3>
                            <p>Never gonna let you down</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={900} height={500} alt="900x500" src={Pic3} />
                        <Carousel.Caption>
                            <h3>Third photo</h3>
                            <p>Never gonna run around</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={900} height={500} alt="900x500" src={Pic4} />
                        <Carousel.Caption>
                            <h3>Fourth photo</h3>
                            <p>And desert you</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}

export default Top;