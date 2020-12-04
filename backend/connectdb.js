const mysql = require('mysql');
/*Utilisation du module mysql de node*/
console.log('connectdb');
//Création de la connection
let connectdb = mysql.createConnection({ 
    host: 'localhost', 
    user: 'root', 
    password: 'snoopy', 
    database: 'P7groupomania', 
});
connectdb.connect(function(err) { 
    if (err) throw err;
    console.log('Connecté à la base de données P7groupomania !')
});

module.exports = connectdb;