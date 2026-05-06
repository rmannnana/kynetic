# **Projet Kynetic**
## Description du projet : Une base de code pour le backend des projets informatiques. Il assure l'authentification(par email et google oauth), la gestion des utilisateurs, des rôles et permissions...
## Stack : NestJS ^11.11.0; Prisma ^6;
## Base de données supportées: Toutes base de données SQL (PostgreSQL, mySQL...)

-----------------------

# **Changelog**

### Création le projet NestJS:
    _npm install -g @nestjs/cli_
    _nest new ._

### Installation des dépendances:
#### Prisma
    _npm install prisma @prisma/client_
    _npm install -D prisma_

#### Auth
    _npm install @nestjs/passport @nestjs/jwt passport passport-local passport-jwt passport-google-oauth20_
    _npm install bcrypt_
    _npm install -D @types/passport-local @types/passport-jwt @types/passport-google-oauth20 @types/bcrypt_

#### Config
    _npm install @nestjs/config_

### Initialisation de prisma
    _npx prisma init_

##### _Préparer l'environnement dans le fichier .env_

### Intiation de Docker Compose

#### Là on crée le fichier docker-compose.yml à la racine du projet.
