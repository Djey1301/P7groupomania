
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');
/**ROUTES UTILISATEUR */
try{
    router.post('/signup', userCtrl.signup);//Création d'un nouveau utilisateur
    router.post('/login', userCtrl.login);//Création d'une Identification de l'utilisateur
    router.get('/', auth, userCtrl.seeMyProfile);//Lecture des informations utilisateur
    router.delete('/', auth, userCtrl.deleteUser);//Suppression du compte utilisateur
    router.put('/', auth, userCtrl.updateUser);//Modification du compte utilisateur
}catch (error){
    console.log(error);
}

module.exports = router;