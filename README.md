# JORYCIA

## Prerequisites

- Docker

## Backend Setup

1. Start a MongoDB container on the default port (27017):
   ```bash
   docker run -d --name mongodb -p 27017:27017 mongo
   ```
2. Pull the backend repository:
   ```bash
   git clone the master branch of https://github.com/amadou-toure/JORYCIA_API.git
   ```
3. Navigate into the backend folder:
   ```bash
   cd jorycia/backend
   ```
4. Install Go dependencies:
   ```bash
   go mod download
   go mod tidy
   ```
5. Create a `.env` file in the root of the backend project, based on `.env.example`, and add your environment variables.
6. Launch the backend server:
   ```bash
   go run main.go
   # Or build and run:
   go build -o main main.go
   ./main
   ```

## Frontend Setup

1. Pull the frontend repository:
   ```bash
   git clone <frontend-repo-url>
   ```
2. Navigate into the frontend folder:
   ```bash
   cd jorycia/frontend
   ```
3. Install JavaScript dependencies:
   ```bash
   yarn
   ```
4. Create a `.env` file in the root of the frontend project, based on `.env.example`, and add your environment variables.
5. Launch the development server:
   ```bash
   yarn dev
   ```

## Configuration en Français

### Prérequis

- Docker

### Installation du Backend

1. Démarrer un conteneur MongoDB sur le port par défaut (27017) :
   ```bash
   docker run -d --name mongodb -p 27017:27017 mongo
   ```
2. Récupérer le dépôt backend :
   ```bash
   git clone <backend-repo-url>
   ```
3. Se placer dans le dossier backend :
   ```bash
   cd jorycia/backend
   ```
4. Installer les dépendances Go :
   ```bash
   go mod download
   go mod tidy
   ```
5. Créer un fichier `.env` à la racine du projet en se basant sur `.env.example` et ajouter vos variables d'environnement.
6. Lancer le serveur backend :
   ```bash
   go run main.go
   # Ou compiler et exécuter :
   go build -o main main.go
   ./main
   ```

### Installation du Frontend

1. Récupérer le dépôt frontend :
   ```bash
   git clone <frontend-repo-url>
   ```
2. Se placer dans le dossier frontend :
   ```bash
   cd jorycia/frontend
   ```
3. Installer les dépendances JavaScript :
   ```bash
   yarn
   ```
4. Créer un fichier `.env` à la racine du projet en se basant sur `.env.example` et ajouter vos variables d'environnement.
5. Lancer le serveur de développement :
   ```bash
   yarn dev
   ```
