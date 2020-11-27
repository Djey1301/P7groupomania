const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');

const gifsCtrl = require('../controllers/gifs');


try{
    router.get('/', auth, gifsCtrl.getAllGifs);
    router.post('/', auth, gifsCtrl.createGif);
    router.put('/:id', auth, gifsCtrl.updateGif);
}catch (error){
    console.log(error);
}   

module.exports = router;