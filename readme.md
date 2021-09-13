# Groupomania

Le réseau social de Groupomania


## Choix

    - Backend : Node.js, Express, MySQL, Sequelize
    - Frontend : React, Axios, Bootstrap et Sass


## Installation

Clonez le projet

Pour le back, ouvrez un terminal et tapez

```bash
     npm install
```

Vérifiez le fichiez .env si vous possédez un mot de passe sur MySql et si vous voulez définir un autre utilisateur que root

Ensuite on va créez la base de donnée en tapant dans le terminal :
```bash
     npx sequelize-cli db:create
     npx sequelize-cli db:migrate
```

Pour le profil Administrateur, tapez dans le terminal :
```bash
     npx sequelize-cli db:seed:all
```

les identifiants de bases du profil sont : 

Adresse mail : admin@gmail.com

Mot de passe : GroupoAdmin357!

Et enfin :
```bash
     npm start
```

 --- 

Pour le front, ouvrez votre terminal et tapez :
```bash
     npm install 
```
Puis :

```bash
     npm start
```
 

Enjoy ;)