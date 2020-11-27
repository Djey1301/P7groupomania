const connectdb = require('../connectdb.js');
const mysql = require('mysql');

class GifsManager {
    constructor() {
        console.log('coucou du GifsManager')
    }
    

    //GIFS

    getAllGifs(){
        let sql = "SELECT gifs.userId, gifs.title, gifs.url, DATE_FORMAT(DATE(gifs.date), '%d/%m/%Y') AS date, TIME(gifs.date) AS time FROM gifs JOIN users ON gifs.userId = users.id ORDER BY gifs.date DESC";
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve(result)
            });
        })
    }
    createGif(sqlInserts){
        let sql = 'INSERT INTO gifs (userId, title, url, date) VALUES( ?, ?, ?, NOW())';
        sql = mysql.format(sql, sqlInserts);
        return new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields) {
                if (err) throw err;
                resolve({message : 'Nouveau gif !'});
            })       
        })
    }
    updateGif(sqlInserts1, sqlInserts2){
        let sql1 = 'SELECT * FROM gifs where id = ?'; 
        sql1 = mysql.format(sql1, sqlInserts1);
        return new Promise((resolve) =>{
            connectdb.query(sql1, function (err, result, fields){
                if (err) throw err;
                if(sqlInserts2[4] == result[0].userId){
                    let sql2 = 'UPDATE gifs SET title = ?, url = ?, date = ?  WHERE id = ? AND userId = ?';
                    sql2 = mysql.format(sql2, sqlInserts2);
                    connectdb.query(sql2, function (err, result, fields){
                        if (err) throw err;
                        resolve({message : 'Commentaire modifié !'});
                    })
                }else{
                    reject({error: 'fonction indisponible'});
                }
            })
        });
    }
    /*deleteGif(sqlInserts1, sqlInserts2){
        let sql1 = 'SELECT * FROM gifs where id = ?';
        sql1 = mysql.format(sql1, sqlInserts1);
        return new Promise((resolve, reject) =>{
            connectdb.query(sql1, function (err, result, fields){
                if (err) throw err;
                if(sqlInserts2[1] == result[0].userId){
                    let sql2 = 'DELETE FROM gifs WHERE id = ? AND userId = ?';
                    sql2 = mysql.format(sql2, sqlInserts2);
                    connectdb.query(sql2, function (err, result, fields){
                        if (err) throw err;
                        resolve({message : 'Gif supprimé !'});
                    })
                }else{
                    reject({error: 'fonction indisponible'});
                }
            
            });
        })
    }*/
}

module.exports = GifsManager;