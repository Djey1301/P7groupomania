const connectdb = require('../connectdb.js');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const GifsManager = require ('../managers/GifsManager.js')

let gifsManager = new GifsManager();


// GIFS

exports.getAllGifs = (req, res, next) => {
    gifsManager.getAllGifs()
        .then((response) => {
            res.status(200).json(JSON.stringify(response));
        });
}
exports.createGif = (req, res, next) => { 
    let title = req.body.title;
    let userId = req.body.userId;
    let url = req.body.url;
    let sqlInserts = [userId, title, url];
    gifsManager.createGif(sqlInserts)
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        })
}
//Evolution possible
/*
exports.updateGif = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let title = req.body.title;
    let url = req.body.url;
    let gifId = req.params.id;
    let sqlInserts1 = [gifId];
    let sqlInserts2 = [title, url, gifId, userId];
    gifsManager.updateGif(sqlInserts1, sqlInserts2)
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        })
}
exports.deleteGif = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let sqlInserts = [userId];
    gifsManager.deletePost(sqlInserts)
        .then((response) =>{
            res.status(200).json(JSON.stringify(response));
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        })
}*/
