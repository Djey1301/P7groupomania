const mysql = require('mysql');
/*Utilisation du module mysql de node*/
console.log('connectdb');
//Création de la connection
let connectdb = mysql.createConnection({ 
    host: 'localhost', 
    user: 'root', 
    password: 'votre mot de passe', 
    database: 'le nom de votre base', 
});
connectdb.connect(function(err) { 
    if (err) throw err;
    console.log('Connecté à la base de données votre base !')
});

module.exports = connectdb;