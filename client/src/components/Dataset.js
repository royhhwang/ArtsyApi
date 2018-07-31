import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import { Row, Col, Grid, Glyphicon } from 'react-bootstrap';
import Default from '../img/artsy.png';
import Spinner from "./Spinner";
import '../css/Dataset.css';

const traverson = require('traverson');
const JsonHalAdapter = require('traverson-hal');
const xappToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTUzMzE1NzM4NSwiaWF0IjoxNTMyNTUyNTg1LCJhdWQiOiI1YjU4ZTU4OTQwMDY5OTMzZjEwZWEzNjUiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWI1OGU1ODk3MzVmZmM1MjQwZDM5MjliIn0.Yzg1iWiMTlFR_i3bsWO3Em5WeYSwgjilrLBoBLO4izs';
let imgHits = 10;

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);

class Dataset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            secondResults: [],
            pushResults: [],
            loading: false,
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
        let artData = [];
        let api = traverson.from('https://api.artsy.net/api/search?q=space').jsonHal();
        api.newRequest()
            .withRequestOptions({
                headers: {
                    'X-Xapp-Token': xappToken,
                    'Accept': 'application/vnd.artsy-v2+json'
                }
            })
            .getResource((error, art) => {
                artData.push(art);
                this.setState({ results: this.state.results.concat(artData[0]._embedded.results) });

                if (this.state.results !== []) {
                    let secData = [];
                    let secondApi = traverson.from('https://api.artsy.net/api/search?offset=10&q=space&size=10').jsonHal();
                    secondApi.newRequest()
                        .withRequestOptions({
                            headers: {
                                'X-Xapp-Token': xappToken,
                                'Accept': 'application/vnd.artsy-v2+json'
                            }
                        })
                        .getResource((error, art) => {
                            secData.push(art);
                            this.setState({ secondResults: this.state.results.concat(secData[0]._embedded.results) });
                        })
                }
            })
    }

    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            this.setState({ loading: true });
            setTimeout(() => {
                this.handleSearchPush();
            }, 1000);
        }
        else {
            return (null);
        }
    }

    handleSearchPush() {
        imgHits += 10;
        let pushData = [];
        let api = traverson.from('https://api.artsy.net/api/search?offset=' + imgHits + '&q=space&size=10').jsonHal();
        api.newRequest()
            .withRequestOptions({
                headers: {
                    'X-Xapp-Token': xappToken,
                    'Accept': 'application/vnd.artsy-v2+json'
                }
            })
            .getResource((error, art) => {
                pushData.push(art);
                this.setState({ pushResults: this.state.pushResults.concat(pushData[0]._embedded.results) });
                this.setState({ loading: false });
            })
    }

    handleSpinner = (loading) => {
        if (this.state.loading === true) {
            return (
                <Spinner />
            )
        }
        else {
            return (null);
        }
    }

    render() {

        let dataArray = this.state.secondResults;
        let pushArray = this.state.pushResults;

        let artistData = dataArray.map((art, index) => {
            if (art._links.thumbnail !== undefined && art._links.thumbnail.href !== "/assets/shared/missing_image.png") {
                return (
                    <div key={index}>
                        <Col xs={6} sm={6} md={4} lg={3}>
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
            else if (art._links.thumbnail === undefined || art._links.thumbnail.href === "/assets/shared/missing_image.png") {
                return (
                    <div key={index}>
                        <Col xs={6} sm={6} md={4} lg={3}>
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
            else {
                return (null);
            }
        });

        let artistPush = pushArray.map((art, index) => {
            if (art._links.thumbnail !== undefined && art._links.thumbnail.href !== "/assets/shared/missing_image.png") {
                return (
                    <div key={index}>
                        <Col xs={6} sm={6} md={4} lg={3}>
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
            else if (art._links.thumbnail === undefined || art._links.thumbnail.href === "/assets/shared/missing_image.png") {
                return (
                    <div key={index}>
                        <Col xs={6} sm={6} md={4} lg={3}>
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
            else {
                return (null);
            }
        });

        return (
            <div className="dataset-layer">
                <Grid>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <Fade>
                                <h3 className="title-block" id="title">Space</h3>
                            </Fade>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <h3 className="empty-block" id="img">&nbsp;</h3>
                        </Col>

                        {artistData}
                        {artistPush}

                        <Col xs={12} sm={12} md={12} lg={12}>
                            <div className="top-arrow" id="popup">
                                {this.handleSpinner()}
                                <h3 className="art-title">Scroll for more</h3>
                                <Glyphicon glyph="triangle-top" />
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <div className="buffer-block">&nbsp;</div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

}

export default Dataset;
