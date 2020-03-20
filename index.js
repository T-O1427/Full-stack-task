const express = require('express');
const FileSystem = require('fs');
const app = express();

// import morgan package
const morgan = require('morgan');

//use it
app.use(morgan('dev'));
// Routes which should handle request

// import body-parser
const bodyParser = require('body-parser');
// let's use it
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/user/:id", (req, res, next) => {
    let rawdata = FileSystem.readFileSync('data.json');
    let users = JSON.parse(rawdata);
    let response = {};
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === req.params.id) {
            response = users[i];
            break;
        }
    }
    res.json(response);
});

app.get("/user/:id/albums", (req, res, next) => {
    let rawdata = FileSystem.readFileSync('data.json');
    let users = JSON.parse(rawdata);
    let response = {};
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === req.params.id) {
            response = users[i].albums;
            break;
        }
    }
    res.json(response);
});

app.get("/user/:id/albums/:albumId", (req, res, next) => {
    let rawdata = FileSystem.readFileSync('data.json');
    let users = JSON.parse(rawdata);
    let response = {};
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === req.params.id) {
            for (let k = 0; k < users[i].albums.length; k++) {
                if (users[i].albums[k].id === req.params.albumId) {
                    response = users[i].albums[k];
                    break;
                }
            }
        }
    }
    res.json(response);
});

app.listen(3000, () => console.log(`Example app listening on port ${3000}!`));
//export app
module.exports = app;