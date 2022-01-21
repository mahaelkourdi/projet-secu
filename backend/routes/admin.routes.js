// ici, on met en place les routes qui seront servies par le serveur web :
// chaque route correspond à un fichier que l'on charge via un require. Ce
// fichier exporte juste une fonction, que l'on appelle quand l'utilisateur
// demande à accéder à la route.
module.exports = app =>{
    //const userCtrl = require("../controllers/user");
    const {sendError, sendMessage} = require ("../message");
    var router = require("express").Router();

    const adminCtrl = require ('../controllers/admin/admin');

    router.get('/',(req,res)=> {
        sendMessage(res,"Welcome to The applica33tion!");
    })


    router.post('/login',(req,res)=>{
        adminCtrl.login(req,res);
    })

    router.post('/update',(req,res)=>{
        adminCtrl.updatePassword(req,res);
    })

    router.post('/setUser',(req,res)=>{
        adminCtrl.setUser(req,res);
        
    }) 

    router.get('/getUser/:idUser',(req,res)=>{
        adminCtrl.getAllUser(req,res);
    })
    
    router.get('/getUserById/:idUser',(req,res)=>{
        adminCtrl.getUserById(req,res);
    })

    router.get('/deleteUser/:idUser',(req,res)=>{
        adminCtrl.deleteUser(req,res);
    })
    router.post('/setAdmin',(req,res)=>{
        adminCtrl.setAdmin(req,res);
    })
    router.get('/grant/:idUser/:previlege_type/:value',(req,res)=>{
        adminCtrl.grant(req,res);
    })
    

    app.use('/api/admin',router);
}
