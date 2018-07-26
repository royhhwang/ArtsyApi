import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import { Row, Col, Grid, Glyphicon } from 'react-bootstrap';
import Default from '../img/artsy.png';
import '../css/Dataset.css';

const traverson = require('traverson');
const JsonHalAdapter = require('traverson-hal');
const xappToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTUzMzE1NzM4NSwiaWF0IjoxNTMyNTUyNTg1LCJhdWQiOiI1YjU4ZTU4OTQwMDY5OTMzZjEwZWEzNjUiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWI1OGU1ODk3MzVmZmM1MjQwZDM5MjliIn0.Yzg1iWiMTlFR_i3bsWO3Em5WeYSwgjilrLBoBLO4izs';

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);
let api = traverson.from('https://api.artsy.net/api/search?q=space').jsonHal();
let imgHits = 0;

class Dataset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            nextPage: '',
            query: '',
            winHeight: window.innerHeight
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.handleApiSearch();
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleApiSearch() {
        let artdata = [];
        api.newRequest()
            .withRequestOptions({
                headers: {
                    'X-Xapp-Token': xappToken,
                    'Accept': 'application/vnd.artsy-v2+json'
                }
            })
            .getResource((error, art) => {
                artdata.push(art);
                this.setState({ results: artdata[0]._embedded.results });
                this.setState({ nextPage: artdata[0]._links.next.href.split("10").shift() });
                this.setState({ query: "&q" + artdata[0]._links.next.href.split("q").pop() });
            })
    }

    handlePagination() {
        let artdata = [];
        imgHits += 10;
        api = traverson.from(this.state.nextPage + imgHits + this.state.query).jsonHal();
        api.newRequest()
            .withRequestOptions({
                headers: {
                    'X-Xapp-Token': xappToken,
                    'Accept': 'application/vnd.artsy-v2+json'
                }
            })
            .getResource((error, art) => {
                artdata.push(art);
                this.setState({ results: artdata[0]._embedded.results });
            })
    }

    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            this.handlePagination();
            document.getElementById('title').scrollIntoView();
        }
        else {
            return (null);
        }
    }

    render() {

        const artistData = this.state.results.map((art) => {
            if (art._links.thumbnail !== undefined && art._links.thumbnail.href !== "/assets/shared/missing_image.png") {
                return (
                    <div key={art._links.permalink.href}>
                        <Col xs={12} sm={6} md={4} lg={3}>
                            <div className="data-block">
                                <Fade bottom>
                                    <a href={art._links.permalink.href} target="_blank" rel="noopener noreferrer"><img src={art._links.thumbnail.href} alt={art.title} className="img-blocks" /></a>
                                </Fade>
                                <Fade left>
                                    <h4 className="img-titles">{art.title}</h4>
                                </Fade>
                            </div>
                        </Col>
                    </div>
                )
            }
            else if (!art._links.thumbnail) {
                return (
                    <div key={art._links.permalink.href}>
                        <Col xs={12} sm={6} md={4} lg={3}>
                            <Fade bottom>
                                <a href={art._links.permalink.href} target="_blank" rel="noopener noreferrer"><img src={Default} alt={art.title} className="artsy-block img-blocks" /></a>
                            </Fade>
                            <Fade left>
                                <h4 className="img-titles">{art.title}</h4>
                            </Fade>
                        </Col>
                    </div>
                )
            }
            else if (art._links.thumbnail.href !== undefined && art._links.thumbnail.href === "/assets/shared/missing_image.png") {
                return (
                    <div key={art._links.permalink.href}>
                        <Col xs={12} sm={6} md={4} lg={3}>
                            <div className="data-block">
                                <Fade bottom>
                                    <a href={art._links.permalink.href} target="_blank" rel="noopener noreferrer"><img src={Default} alt={art.title} className="artsy-block img-blocks" /></a>
                                </Fade>
                                <Fade left>
                                    <h4 className="img-titles">{art.title}</h4>
                                </Fade>
                            </div>
                        </Col>
                    </div>
                )
            }
            else {
                return (null);
            }
        })

        return (
            <div className="dataset-layer">
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <Fade>
                                <h3 className="title-block" id="title">title</h3>
                            </Fade>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <h3 className="empty-block" id="img">&nbsp;</h3>
                        </Col>
                        {artistData}
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <div className="top-arrow hvr-ripple-out-black" id="popup">
                                <Glyphicon glyph="triangle-bottom" />
                            </div>
                            <h3 className="buffer-block">Scroll to view more</h3>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

}

export default Dataset;
