// ici, on se connecte à la base de données. Ainsi, on pourra utiliser
// db (l'équivalent de PDO) pour réaliser les requêtes mySQL.
const config = require('../config');
const db = require ('../mysqlConnect');

// chaque requête correspond à une fonction qui renverra ce que l'on appelle
// une Promise (promesse). Une promesse est un objet qui contient une
// fonction (dont on sait qu'elle sera exécutée dans le futur). La promesse
// est renvoyée avant que la fonction ne soit exécutée (fonctionnement donc
// asynchrone). Quand la fonction a été exécutée, la callback appelle la
// fonction resolve qui indique à la promesse qu'elle peut renvoyer la
// réponse en question.




//La fonction est utilisé pour addAvis.js pour ajouter dans la table Avis
function addUser(name, password , email) {
    //ajouter l'avis dans la table AVis
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
module.exports.addUser = addUser; // on exporte la fonction



