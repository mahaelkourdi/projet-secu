// ici, on met en place les routes qui seront servies par le serveur web :
// chaque route correspond à un fichier que l'on charge via un require. Ce
// fichier exporte juste une fonction, que l'on appelle quand l'utilisateur
// demande à accéder à la route.
module.exports = app =>{
    //const userCtrl = require("../controllers/user");
    const {sendError, sendMessage} = require ("../message");
    var router = require("express").Router();

    const userCtrl = require ('../controllers/user/user');

    router.get('/',(req,res)=> {
        sendMessage(res,"Welcome to The applic333at3333ion!");
    })

    router.post('/signup', (req, res) => {
        userCtrl.signup(req,res);
    });

    router.post('/login',(req,res)=>{
        userCtrl.login(req,res);
    })

    router.post('/update',(req,res)=>{
        userCtrl.updatePassword(req,res);
    })

    router.get('/getUser/:idUser',(req,res)=>{
        userCtrl.getAllUser(req,res);
    })
    
    router.get('/getUserById/:idUser',(req,res)=>{
        userCtrl.getUserById(req,res);
    })
    

    app.use('/api/user',router);
}
