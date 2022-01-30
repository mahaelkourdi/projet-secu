// ici, on se connecte à la base de données. Ainsi, on pourra utiliser
// db (l'équivalent de PDO) pour réaliser les requêtes mySQL.
const config = require('../../config/config');
const db = require ('../../config/mysqlConnect');

// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken');
// const { mysqlUser } = require('../../config/config');

// chaque requête correspond à une fonction qui renverra ce que l'on appelle
// une Promise (promesse). Une promesse est un objet qui contient une
// fonction (dont on sait qu'elle sera exécutée dans le futur). La promesse
// est renvoyée avant que la fonction ne soit exécutée (fonctionnement donc
// asynchrone). Quand la fonction a été exécutée, la callback appelle la
// fonction resolve qui indique à la promesse qu'elle peut renvoyer la
// réponse en question.



function signup(name, password , email) {
    const query = `
        INSERT INTO ${config.mysqlUser} (name, password , email) 
        VALUES ?`;

    const data = [
        [name, password , email]
    ];

    return new Promise((resolve, reject) => {
        db.query(query,[data],(err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

function add_privilege(idUser, privilege){
    const query = `
    INSERT INTO ${config.mysqlPrivilege} (idUser, privilege_type) 
    VALUES ?`;

    const data = [
        [idUser, privilege]
    ];

    return new Promise((resolve, reject) => {
        db.query(query,[data],(err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}


function updatePassword(idUser,password){
    const query = `
        UPDATE ${config.mysqlUser}
        SET password = ?
        WHERE (idUser = ?)`;
    const data = [
        [password], [idUser]
    ];

    return new Promise((resolve, reject) => {
        db.query(query,data,(err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });   
}




function getByMail(email){
    
    const query = `
        SELECT * FROM  ${config.mysqlUser}
        WHERE email = ?`;

    return new Promise((resolve, reject) => {
        db.query(query,(email),(err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

function getUserById(idUser){
    
    const query = `
        SELECT idUser, name, email FROM  ${config.mysqlUser}
        WHERE idUser = ?`;

    return new Promise((resolve, reject) => {
        db.query(query,(idUser),(err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}


function getGrantDate(idUser){
    const query = `
        SELECT is_grantable FROM  ${config.mysqlPrivilege}
        WHERE (idUser = ?) AND (privilege_type = 'date')`;
    return new Promise((resolve, reject) => {
        db.query(query,(idUser),(err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

function getGrantEmail(idUser){
    const query = `
        SELECT is_grantable FROM  ${config.mysqlPrivilege}
        WHERE (idUser = ?) AND (privilege_type = 'email')`;
    return new Promise((resolve, reject) => {
        db.query(query,(idUser),(err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

function getAllUser(date,email){
    let query = ``;
    if(date == 1 ){
        if(email == 1){
            query = `
                SELECT name , email, signup_date FROM ${config.mysqlUser}`
        }else{
            query = `
                SELECT name , signup_date FROM ${config.mysqlUser}`
        }
    }else {
        if(email == 1){
            query = `
                SELECT name , email FROM ${config.mysqlUser}`
        }else{
            query = `
                SELECT name  FROM ${config.mysqlUser}`
        }
    }
    return new Promise((resolve, reject) => {
        db.query(query,(err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });

}

function deleteUser(idUser) {
    const query = `
          DELETE FROM  ${config.mysqlUser}
          WHERE idUser = ?`;
  
    return new Promise((resolve, reject) => {
      db.query(query, idUser, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }



module.exports.signup = signup; // on exporte la fonction
module.exports.add_privilege = add_privilege;
module.exports.updatePassword = updatePassword;
module.exports.getGrantDate = getGrantDate;
module.exports.getByMail = getByMail;
module.exports.getGrantEmail = getGrantEmail;
module.exports.getAllUser = getAllUser;
module.exports.getUserById = getUserById;
module.exports.deleteUser = deleteUser;


