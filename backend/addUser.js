// les queries dans la base de données.
const queries = require('./mysql/mysqlAddUser');


const {sendError, sendMessage} = require ("./message");

async function addUser (req,res) {
    const data = req.body;
    console.log(data)
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const user = await queries.addUser(name, password , email);
            sendMessage(res, 'L\'utilisateur a été ajouter');

}
module.exports = addUser;