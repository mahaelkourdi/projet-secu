// les queries dans la base de données.
const queries = require('./mysqlUser');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { sendError, sendMessage } = require('../../message');

async function signup(req, res) {
  if (req.body.name && req.body.password && req.body.email) {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const user = await queries.getByMail(email);
    if (user.length > 0) {
      sendError(res, { error: 'Cette adresse mail est déjà utilisée' });
    } else {
      bcrypt
        .hash(password, 10)
        .then(async (hash) => {
          const user = await queries.signup(name, hash, email);
          //Insertion dans la table privilege
          const idUser = user.insertId;
          const add_privilege1 = await queries.add_privilege(idUser, 'date');
          const add_privilege2 = await queries.add_privilege(idUser, 'email');

          sendMessage(res, "L'utilisateur a été ajouter");
        })
        .catch((error) => sendError(res, { error: error.stack }));
    }
  } else {
    sendError(res, 'Missing Data');
  }
}

async function updatePassword(req, res) {
  if (req.body.idUser && req.body.password) {
    bcrypt
      .hash(req.body.password, 10)
      .then(async (hash) => {
        const user = await queries.updatePassword(req.body.idUser, hash);

        sendMessage(res, 'Le mot de passe a été modifié');
      })
      .catch((error) => sendError(res, { error: error.stack }));
  } else {
    sendError(res, 'Missing Data');
  }
}

async function login(req, res) {
  if (req.body.password && req.body.email) {
    const password = req.body.password;
    const email = req.body.email;

    const user = await queries.getByMail(email);
    if (user.length > 0) {
      console.log(user);
      bcrypt.compare(password, user[0].password).then((valid) => {
        if (!valid) {
          return sendError(res, { error: 'Mot de passe incorrect !' });
        }
        sendMessage(res, {
          userId: user[0].idUser,
          role: 'User',
          token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
            expiresIn: '24h',
          }),
        });
      });
    } else {
      sendError(res, "Can't find the user");
    }
  } else {
    sendError(res, 'Missing Data');
  }
}

async function getAllUser(req, res) {
  const idUser = req.params.idUser;
  let date = await queries.getGrantDate(idUser);
  date = date[0].is_grantable;
  let email = await queries.getGrantEmail(idUser);
  email = email[0].is_grantable;
  const users = await queries.getAllUser(date, email);
  sendMessage(res, users);
}

async function getUserById(req, res) {
  const idUser = req.params.idUser;
  let user = await queries.getUserById(idUser);
  sendMessage(res, user);
}

async function deleteUser(req, res) {
  const idUser = req.params.idUser;
  let user = await queries.deleteUser(idUser);
  sendMessage(res, user);
}



module.exports.signup = signup;
module.exports.login = login;
module.exports.updatePassword = updatePassword;
module.exports.getAllUser = getAllUser;
module.exports.getUserById = getUserById;
