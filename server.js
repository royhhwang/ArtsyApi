'use strict';

var mongoose = require('./mongoose'),
    passport = require('passport'),
    express = require('express'),
    path = require('path'),
    jwt = require('jsonwebtoken'),
    expressJwt = require('express-jwt'),
    router = express.Router(),
    cors = require('cors'),
    bodyParser = require('body-parser'),

    request = require('request'),
    twitterConfig = require('./twitter.config.js');

mongoose();

var User = require('mongoose').model('User');
var passportConfig = require('./passport');

passportConfig();

const app = express();
const port = process.env.PORT || 8080;

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

if (process.env.NODE_ENV === 'production') {

    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log('-----------------------\n' + `Listening on port ${port}`));