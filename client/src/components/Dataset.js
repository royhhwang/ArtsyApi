import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import { Glyphicon } from 'react-bootstrap';
import Default from '../img/artsy.png';
import Spinner from "./Spinner";
import '../css/Dataset.css';

var request = require('superagent');
var clientID = "75d6773448d08c419c89",
    clientSecret = "09cf60f760cc5a644146a71544ec373b",
    apiUrl = 'https://api.artsy.net/api/tokens/xapp_token',
    xappToken;

let imgRefresh = 0;
let imgHits = 0;
const traverson = require('traverson');
const JsonHalAdapter = require('traverson-hal');
traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);

class Dataset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            firstResults: [],
            secondResults: [],
            pushResults: [],
            hyperlinks: [],
            loading: false,
            query: 'space',
            winHeight: window.innerHeight
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.handleToken();
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleToken() {
        request
            .post(apiUrl)
            .send({ client_id: clientID, client_secret: clientSecret })
            .then(res => {
                xappToken = res.body.token;
                this.handleApiSearch();
                this.handleStaticFav();
            });
    }

    handleApiSearch() {
        let artData = [];
        let api = traverson.from('https://api.artsy.net/api/search?q=' + this.state.query).jsonHal();
        api.newRequest()
            .withRequestOptions({
                headers: {
                    'X-Xapp-Token': xappToken,
                    'Accept': 'application/vnd.artsy-v2+json'
                }
            })
            .getResource((error, art) => {
                artData.push(art);
                this.setState({ secondResults: this.state.results.concat(artData[0]._embedded.results) });
            })
    }

    handleStaticFav() {
        let artData = [];
        let randomizer = ['balloons', 'jade', 'happy', 'flowers', 'books', 'library', 'jewel', 'crystal'];
        let randomQuery = randomizer[Math.floor(Math.random() * randomizer.length)];
        let api = traverson.from('https://api.artsy.net/api/search?q=' + randomQuery).jsonHal();
        api.newRequest()
            .withRequestOptions({
                headers: {
                    'X-Xapp-Token': xappToken,
                    'Accept': 'application/vnd.artsy-v2+json'
                }
            })
            .getResource((error, art) => {
                artData.push(art);
                this.setState({ firstResults: this.state.results.concat(artData[0]._embedded.results) });
            })
    }

    handleSearchValue = (event) => {
        event.preventDefault();
        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 2) {
                this.handleContentRefresh();
                this.search.value = '';
                imgHits = 0;
            }
            else {
                document.getElementById('empty-text').innerHTML = "Please enter at least 3 letters!";
            }
        }
        )
    }

    handleContentRefresh = () => {
        let pushData = [];
        let api = traverson.from('https://api.artsy.net/api/search?offset=' + imgRefresh + '&q=' + this.state.query + '&size=10').jsonHal();
        api.newRequest()
            .withRequestOptions({
                headers: {
                    'X-Xapp-Token': xappToken,
                    'Accept': 'application/vnd.artsy-v2+json'
                }
            })
            .getResource((error, art) => {
                pushData.push(art);
                this.setState({ secondResults: pushData[0]._embedded.results });
                this.setState({ pushResults: [] });
                this.setState({ loading: false });
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
        let api = traverson.from('https://api.artsy.net/api/search?offset=' + imgHits + '&q=' + this.state.query + '&size=10').jsonHal();
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
        let imgArray = this.state.firstResults;

        let imageLinking = imgArray.slice(0, 9).map((art, index) => {
            if (art._links.thumbnail !== undefined && art._links.thumbnail.href !== "/assets/shared/missing_image.png") {
                return (
                    <a href={art._links.permalink.href} key={index} target="_blank" rel="noopener noreferrer"><img src={art._links.thumbnail.href} alt={art.title} className="static-img-layer" /></a>
                )
            }
            else {
                return (
                    null
                )
            }
        });

        let artistData = dataArray.map((art, index) => {
            if (art._links.thumbnail !== undefined && art._links.thumbnail.href !== "/assets/shared/missing_image.png") {
                return (
                    <div key={index} className="data-block">
                        <Fade bottom>
                            <a href={art._links.permalink.href} target="_blank" rel="noopener noreferrer"><img src={art._links.thumbnail.href} alt={art.title} className="img-blocks" /></a>
                        </Fade>
                        <Fade left>
                            <h4 className="img-titles">{art.title}</h4>
                        </Fade>
                    </div>
                )
            }
            else if (art._links.thumbnail === undefined || art._links.thumbnail.href === "/assets/shared/missing_image.png") {
                return (
                    <div key={index} className="data-block">
                        <Fade bottom>
                            <a href={art._links.permalink.href} target="_blank" rel="noopener noreferrer"><img src={Default} alt={art.title} className="artsy-block img-blocks" /></a>
                        </Fade>
                        <Fade left>
                            <h4 className="img-titles">{art.title}</h4>
                        </Fade>
                    </div>
                )
            }
            else {
                return (null);
            }
        });

        let pushArray = this.state.pushResults;
        let artistPush = pushArray.map((art, index) => {
            if (art._links.thumbnail !== undefined && art._links.thumbnail.href !== "/assets/shared/missing_image.png") {
                return (
                    <div key={index} className="data-block">
                        <Fade bottom>
                            <a href={art._links.permalink.href} target="_blank" rel="noopener noreferrer"><img src={art._links.thumbnail.href} alt={art.title} className="img-blocks" /></a>
                        </Fade>
                        <Fade left>
                            <h4 className="img-titles">{art.title}</h4>
                        </Fade>
                    </div>
                )
            }
            else if (art._links.thumbnail === undefined || art._links.thumbnail.href === "/assets/shared/missing_image.png") {
                return (
                    <div key={index} className="data-block">
                        <Fade bottom>
                            <a href={art._links.permalink.href} target="_blank" rel="noopener noreferrer"><img src={Default} alt={art.title} className="artsy-block img-blocks" /></a>
                        </Fade>
                        <Fade left>
                            <h4 className="img-titles">{art.title}</h4>
                        </Fade>
                    </div>
                )
            }
            else {
                return (null);
            }
        });

        return (
            <div className="dataset-layer">
                <div className="static-layer">
                    <h3>Spotlight</h3>
                    {imageLinking}
                </div>
                <Fade>
                    <h3 className="title-block" id="title">Gallery</h3>
                    <br />
                    <form id="form-layer"
                        onSubmit={this.handleSearchValue}
                    >
                        <input
                            placeholder="Search . . ."
                            ref={input => this.search = input}
                            style={{ textAlign: 'center', verticalAlign: 'middle' }}
                        />
                    </form>
                    <div id="empty-text" />
                </Fade>
                <div className="image-col">
                    {artistData}
                    {artistPush}
                </div>
                <div className="top-arrow" id="popup">
                    {this.handleSpinner()}
                    <h3 className="art-title">Scroll for more</h3>
                    <Glyphicon glyph="triangle-top" />
                </div>
                <div className="buffer-block">&nbsp;</div>
            </div>
        );
    }

}

export default Dataset;
