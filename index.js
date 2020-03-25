const express = require('express');
const FileSystem = require('fs');
const cors = require('cors');
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
app.use(cors());

app.get("/user/:id", (req, res, next) => {
    let rawdata = FileSystem.readFileSync('data.json');
    let users = JSON.parse(rawdata);
    let response = {};
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === req.params.id) {
            response = users[i];
            break;
        /** If we didnt got a result based on id match, we can check for a result based on user name */
        } else if (users[i].name === req.params.id) {
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

app.post("/user/:id/albums/:albumId/loan", (req, res, next) => {
    let payload = req.body;

    let rawdata = FileSystem.readFileSync('data.json');
    let users = JSON.parse(rawdata);
    let response = {};
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === req.params.id) {
            for (let k = 0; k < users[i].albums.length; k++) {
                if (users[i].albums[k].id === req.params.albumId) {
                    if (!Array.isArray(users[i].albums[k].loans)) {
                        users[i].albums[k].loans = [];
                    }

                    users[i].albums[k].loans.push({userName: payload.username, date: payload.date});
                    response = users[i].albums[k];
                    break;
                }
            }
        }
    }

    /*Writing the file*/
    FileSystem.writeFile('data.json', JSON.stringify(users, null, 4), function (err) {
        if (err) throw err;
        console.log('Replaced!');
    });

    /**
    * you search for the album that you need to loan
     * you add the loaner information to the album that you found
     * you save the file with the amended information
     * then return a response that you amended the album with the loaner information
    * */
    res.json(response);
});

app.get("/user/:id/albums/loans/:username", (req, res, next) => {
    let rawdata = FileSystem.readFileSync('data.json');
    let users = JSON.parse(rawdata);
    let response = [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === req.params.id) {
            for (let k = 0; k < users[i].albums.length; k++) {
                if (!Array.isArray(users[i].albums[k].loans)) {
                    users[i].albums[k].loans = [];
                }
                for (let l = 0; l < users[i].albums[k].loans.length; l++) {
                    if (users[i].albums[k].loans[l].userName === req.params.username) {
                        response.push(users[i].albums[k]);
                        break;
                    }
                }
            }
        }
    }
    res.json(response);
});

let port = 3020;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//export app
module.exports = app;