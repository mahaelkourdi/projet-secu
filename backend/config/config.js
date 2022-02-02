const config = {
    // paramètres de connexion à la base de données
    mysqlHost:  '127.0.0.1',   //'db', pour docker '127.0.0.1', sans docker
    mysqlDatabase: 'annuaire_secu',
    charset:       'utf8',
    mysqlLogin:    'phpmyadmin', //'root'   //'phpmyadmin'
    mysqlPassword: 'phpmyadmin', //'phpmyadmin'

    // les noms des tables
    mysqlUser:    'User',
    mysqlAdmin :  'Admin',
    mysqlPrivilege : 'privilege'
};

// on exporte la config. En l'exportant comme ci-dessous, on pourra utiliser la
// syntaxe suivante pour la charger dans d'autres fichiers :
// const config = require ('./config');
module.exports = config;