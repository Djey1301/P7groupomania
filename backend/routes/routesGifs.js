const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');

const gifsCtrl = require('../controllers/gifs');


try{
    router.get('/', auth, gifsCtrl.getAllGifs);//Lecture de tous les gifs
    router.post('/', auth, gifsCtrl.createGif);//Création d'un gif
    router.delete('/', auth, gifsCtrl.deleteGif);//Supprimer un gif
}catch (error){
    console.log(error);
}   

module.exports = router;