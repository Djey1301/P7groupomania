const mysql = require('mysql');
console.log('connectdb');
let connectdb = mysql.createConnection({ 
    host: 'localhost', 
    user: 'root', 
    password: 'snoopy', 
    database: 'P7groupomania', 
});
connectdb.connect(function(err) { 
    if (err) throw err;
    console.log('Connecté à la base de données groupomania !')
});

module.exports = connectdb;