# Projet Sécurité SI

## Lancer l'appli avec docker 

1. Dans la racine du dossier, lancer les commandes suivantes : 
  *docker-compose build*
  *docker-compose up* 
  
  Vérifier si les images sont build ( Vérifier le dashboard de Docker) 
  
2. Aller sur localhost:8080 (PhpMyAdmin), créer une nouvelle base de données *annuaire_secu* et importer la base de données qui dans la racine du dossier. 
3. Tester le backend sur postman, exemple : http://localhost:3000/addUser, le message suivant s'affiche : 
     "status": "ok",
    "data": "L'utilisateur a été ajouter"
    
    
## Lancer l'appli sans docker 

Modifier  et le fichier config.js du backend à votre environnement. Si vous changez la config veuillez ne pas la push :) 
