# Kynetic — Backend Starter

Kynetic est une base de projet backend construite avec **NestJS**, **Prisma 6** et **PostgreSQL**. Elle fournit dès le départ tout ce qu'il faut pour démarrer un nouveau projet sans repartir de zéro : authentification complète, gestion des rôles, sécurité de base et connexion à la base de données.

L'idée est simple : cloner ce projet, ajouter ses propres modules, et se concentrer sur la logique métier.

---

## I. Stack technique

| Outil | Version | Rôle |
|---|---|---|
| NestJS | 11.0.21 | Framework backend |
| Prisma | 6.19.3 | ORM |
| PostgreSQL | 16 | Base de données |
| Docker | - | Conteneurisation de la DB |
| Passport.js | - | Stratégies d'authentification |
| JWT | - | Gestion des tokens |

---

## II. Prérequis

Avant de commencer, assure-toi d'avoir installé :

- [Node.js](https://nodejs.org) v18 ou supérieur (24.14.1 dans notre cas)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [NestJS CLI](https://docs.nestjs.com/cli/overview) : `npm i -g @nestjs/cli`

---

## III. Utiliser Kynetic comme base pour un nouveau projet

Kynetic est conçu pour être cloné et utilisé comme point de départ. Voici comment créer un nouveau projet indépendant à partir de Kynetic.

### 1. Cloner Kynetic sans l'historique Git

```bash
git clone https://github.com/rmannnana/kynetic.git nom-du-projet
cd nom-du-projet
```

Supprime le lien avec le repository Kynetic :

1. Linux / Mac
```bash
rm -rf .git
```

2. Windows (Powershell) :

```bash
Remove-Item -Recurse -Force .git
```
### 2. Installer les dépendances

```bash
npm install
```

### 3. Initialiser un nouveau repository Git

```bash
git init
git add .
git commit -m "init: base de projet kynetic"
```

### 4. Lier au nouveau repository distant
Crée un nouveau repository vide sur GitHub, puis :

```bash
git remote add origin https://github.com/ton-username/nom-du-repository.git
git branch -M main
git push -u origin main
```

### 5. Configurer les variables d'environnement

Renomme le fichier `.env.example` en `.env` et remplis les valeurs.

```bash
cp .env.example .env
```
Voir la section [Variables d'environnement](#variables-denvironnement) pour le détail de chaque variable.

### 6. Adapter le projet

- Renomme le projet dans `package.json` (champ `name`)
- Mets à jour le `.env` avec les variables propres au nouveau projet (nouvelle DB, nouveaux secrets JWT, nouveaux identifiants Google OAuth, nouveau `FRONTEND_URL`)
- Mets à jour le `docker-compose.yml` si tu veux changer le nom du container de la base de données

### 7. Lancer la base de données

```bash
docker compose up -d
```
---

### 8. Générer et appliquer les migrations Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

### 9. Lancer le projet

```bash
# Développement
npm run start:dev

# Production
npm run build
npm run start:prod
```

L'API est disponible sur `http://localhost:3000`.

---

## IV. Variables d'environnement

Voici le contenu du fichier `.env.example` (ou `.env` si tu as déjà changer le nom à l'étape III.5) avec une explication de chaque variable :


### 1. Variables liées à la base de données PostgreSQL
Remplis les informations que tu souhaite pour ta base de données.
```bash
POSTGRES_USER=kynetic_user
POSTGRES_PASSWORD=kynetic_password
POSTGRES_DB=kynetic_db
POSTGRES_PORT=5432
```
### 2. Tu peux modifier DB_URL si tu préfère utiliser une autre base de données.
```bash
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${POSTGRES_PORT}/${POSTGRES_DB}"
```
### 3. Clé secrète pour signer les access et refresh tokens JWT:
```bash
JWT_ACCESS_SECRET=change_me_access_secret
JWT_REFRESH_SECRET=change_me_refresh_secret
```
On peut les générer aléatoirement avec
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 4. Durée de vie des tokens

```bash
# Access token (ex: 15m, 1h, 24h)
JWT_ACCESS_EXPIRES_IN=15m

# Refresh token (ex: 7d, 30d)
JWT_REFRESH_EXPIRES_IN=7d
```
### 5. Identifiants OAuth Google
Obtenir sur : https://console.cloud.google.com
```bash
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```
### 6. URL de callback Google OAuth (doit correspondre à celle configurée dans Google Cloud Console)
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

---

## V. Structure du projet

```
src/
├── auth/                        # Module d'authentification
│   ├── decorators/
│   │   ├── current-user.decorator.ts   # @CurrentUser() — récupère l'utilisateur connecté
│   │   └── roles.decorator.ts          # @Roles() — spécifie les rôles autorisés sur une route
│   ├── dto/
│   │   ├── login.dto.ts                # Validation du body pour le login
│   │   ├── refresh.dto.ts              # Validation du refresh token
│   │   └── register.dto.ts             # Validation du body pour l'inscription
│   ├── guards/
│   │   ├── google-auth.guard.ts        # Protection des routes Google OAuth
│   │   ├── jwt-auth.guard.ts           # Protection des routes nécessitant un JWT valide
│   │   ├── local-auth.guard.ts         # Protection des routes email/password
│   │   └── roles.guard.ts              # Vérification des rôles sur les routes protégées
│   ├── strategies/
│   │   ├── google.strategy.ts          # Stratégie Passport pour Google OAuth
│   │   ├── jwt.strategy.ts             # Stratégie Passport pour JWT
│   │   └── local.strategy.ts           # Stratégie Passport pour email/password
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
│
├── prisma/                      # Module Prisma global
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
├── users/                       # Module utilisateurs
│   ├── dto/
│   │   └── update-role.dto.ts          # Validation pour la mise à jour du rôle
│   ├── users.controller.ts
│   ├── users.module.ts
│   └── users.service.ts
│
├── app.module.ts                # Module racine (config, throttler, imports globaux)
└── main.ts                      # Point d'entrée (Helmet, ValidationPipe, port)

prisma/
├── schema.prisma                # Schéma de la base de données
└── migrations/                  # Historique des migrations

docker-compose.yml               # Configuration Docker pour PostgreSQL
.env                             # Variables d'environnement (non versionné)
.env.example                     # Modèle de variables d'environnement (versionné)
```

---

## VI. Endpoints disponibles

### Authentification

| Méthode | Route | Description | Auth requise |
|---|---|---|---|
| POST | `/auth/register` | Créer un compte | Non |
| POST | `/auth/login` | Se connecter | Non |
| POST | `/auth/refresh` | Renouveler l'access token | Non |
| POST | `/auth/logout` | Se déconnecter | Non |
| GET | `/auth/google` | Lancer le flux Google OAuth | Non |
| GET | `/auth/google/callback` | Callback Google OAuth | Non |

### Exemples de requêtes

**Register**
```json
POST /auth/register
{
  "email": "user@example.com",
  "password": "motdepasse123"
}
```

**Login**
```json
POST /auth/login
{
  "email": "user@example.com",
  "password": "motdepasse123"
}
```

**Refresh**
```json
POST /auth/refresh
{
  "refreshToken": "uuid-du-refresh-token"
}
```

**Logout**
```json
POST /auth/logout
{
  "refreshToken": "uuid-du-refresh-token"
}
```

### Utilisateurs

| Méthode | Route | Description | Rôle requis |
|---|---|---|---|
| GET | `/users/:id` | Récupérer un utilisateur | Tout utilisateur connecté |
| PATCH | `/users/:id/role` | Modifier le rôle d'un utilisateur | ADMIN uniquement |

Toutes les routes `/users` nécessitent le header :
```
Authorization: Bearer <access_token>
```

---

## VII. Modèle de données

### 1. User

| Champ | Type | Description |
|---|---|---|
| id | String (UUID) | Identifiant unique |
| email | String | Email unique |
| password | String? | Mot de passe hashé (null si OAuth) |
| role | Enum | USER, MODERATOR, ADMIN |
| googleId | String? | ID Google (null si email/password) |
| createdAt | DateTime | Date de création |
| updatedAt | DateTime | Date de mise à jour |

### 2. RefreshToken

| Champ | Type | Description |
|---|---|---|
| id | String (UUID) | Identifiant unique |
| token | String | Token UUID unique |
| userId | String | Référence vers l'utilisateur |
| expiresAt | DateTime | Date d'expiration |
| createdAt | DateTime | Date de création |

---

## VIII. Sécurité

- **Helmet** : headers de sécurité HTTP appliqués globalement
- **Rate limiting** : 20 requêtes/minute sur toutes les routes, 10 requêtes/minute sur les routes d'authentification
- **Validation** : tous les body de requête sont validés via `class-validator`, les champs non déclarés sont rejetés
- **Passwords** : hashés avec bcrypt (10 rounds)
- **Refresh tokens** : stockés en base, révocables à tout moment, expiration à 7 jours

---

## IX. Ajouter un nouveau module

Pour étendre ce projet avec un nouveau module (exemple : `products`) :

```bash
nest g module products
nest g service products
nest g controller products
```

Le `PrismaService` est global, il est directement injectable sans import supplémentaire :

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
}
```

Pour protéger une route avec JWT :

```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Get()
findAll() {}
```

---

## X. Licence

MIT
