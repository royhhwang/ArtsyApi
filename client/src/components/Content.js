import React from 'react';
// import Fade from 'react-reveal/Fade';
import "../css/Content.css";
const request = require('superagent');

const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

const apiUrl = 'https://api.artsy.net/api/tokens/xapp_token';
let xappToken = '';

request
    .post(apiUrl)
    .send({
        client_id: clientId, client_secret: clientSecret
    })
    .end((data) => {
        // xappToken = data.body.token;
        console.log("hit " + data);
    });

const Content = (props) => {
    return (
        <div className="content-layer">

        </div>
    )
}

export default Content;