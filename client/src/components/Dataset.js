import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import { Row, Col } from 'react-bootstrap';
// import Content from './Content.js';
import '../css/Dataset.css';

const traverson = require('traverson');
const JsonHalAdapter = require('traverson-hal');
const xappToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTUzMzE1NzM4NSwiaWF0IjoxNTMyNTUyNTg1LCJhdWQiOiI1YjU4ZTU4OTQwMDY5OTMzZjEwZWEzNjUiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWI1OGU1ODk3MzVmZmM1MjQwZDM5MjliIn0.Yzg1iWiMTlFR_i3bsWO3Em5WeYSwgjilrLBoBLO4izs';

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);
const api = traverson.from('https://api.artsy.net/api').jsonHal();

class Dataset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
        };
    }

    componentDidMount() {
        let artdata = [];
        api.newRequest()
            .follow('artist')
            .withRequestOptions({
                headers: {
                    'X-Xapp-Token': xappToken,
                    'Accept': 'application/vnd.artsy-v2+json'
                }
            })
            .withTemplateParameters({ id: 'arthur-luiz-piza' })
            .getResource((error, artist) => {
                artdata.push(artist);
                this.setState({ results: artdata });
            })
    }

    render() {

        const artistData = this.state.results.map((art) => {
            console.log(art);
            return (
                <div key={art.id}>
                    <Col xs={12}>
                        <Fade bottom>
                            <div className="data-block">
                                <a href={art._links.permalink.href} target="_blank" rel="noopener noreferrer"><img src={art._links.thumbnail.href} alt={art.name} /></a>
                                <h3>{art.name}</h3>
                            </div>
                        </Fade>
                    </Col>
                </div>
            )
        })


        return (
            <div className="dataset-layer">
                <Row>
                    {artistData}
                </Row>
            </div>
        );
    }

}

export default Dataset;
