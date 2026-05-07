# **Projet Kynetic**
#### **Description du projet :** Une base de code pour le backend des projets informatiques. Il assure l'authentification(par email et google oauth), la gestion des utilisateurs, des rôles et permissions...
#### **Stack :** NestJS ^11.11.0; Prisma ^6;
#### **Base de données supportées:** Toutes base de données SQL (PostgreSQL, mySQL...)

-----------------------

# **Changelog**

### Création le projet NestJS:
    ```powershell
        npm install -g @nestjs/cli
        nest new .
    ```

### Installation des dépendances:
#### Prisma
    ```powershell
        npm install prisma@6 @prisma/client@6
        npm install -D prisma
    ```

#### Auth
    ```powershell
        npm install @nestjs/passport @nestjs/jwt passport passport-local passport-jwt passport-google-oauth20
        npm install bcrypt
        npm install -D @types/passport-local @types/passport-jwt @types/passport-google-oauth20 @types/bcrypt
    ```

#### Config
    ```powershell
        npm install @nestjs/config
    ```

### Initialisation de prisma
    ```powershell
        npx prisma init
    ```

### Préparer l'environnement dans le fichier .env
#### - Pour les valeurs JWT_ACCESS_SECRET et JWT_REFRESH_SECRET, on peut utiliser la commande
    ```powershell
        node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
    ```
#### pour les générer aléatoirement.

#### - Pour les valeur Google OAuth, il faut se les procurer sur Google Cloud Console
##### Créer un projet sur Google Cloud Console puis dans APIs & Services → Écran de consentement → Premiers pas.
##### Remplir le formulaire puis Cliquer sur Créer un client OAuth.
###### **1. Sélectionner "OAuth 2.0 Client ID"**
###### **2. Type d'application : Web application**
###### **3. Dans Authorized redirect URIs, ajouter : http://localhost:3000/auth/google/callback**
##### Récupérer les valeurs GOOGLE_CLIENT_ID et GOOGLE_CLIENT_SECRET

### Intiation de Docker Compose

#### Là on crée le fichier docker-compose.yml à la racine du projet.
#### Lancer 
    ```powershell
        docker compose up -d
    ```
#### pour initialiser.

### Défintion du schémas prisma: création des modèles User et RefreshToken

### Lacer les migration avec:
    ```powershell
        npx prisma migrate dev --name init
    ```
## État actuel du projet:

    Projet NestJS initialisé
    Docker + PostgreSQL
    Prisma 6 + schéma + migration


## Création du module Prisma, Users et Auth

# Module Prisma
    ```powershell
        nest g module prisma
        nest g service prisma
    ```

# Module Users
    ```powershell
        nest g module users
        nest g service users
        nest g controller users
    ```

# Module Auth
    ```powershell
        nest g module auth
        nest g service auth
        nest g controller auth
    ```

## Situation après le commit 386dfa1 :
Prisma 6 + PostgreSQL + Docker
Module Prisma (global)
Module Users + RBAC
Module Auth (email/password + JWT + refresh tokens + Google OAuth)

