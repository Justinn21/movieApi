# MovieDB - Explorateur de Films Avancé

MovieDB est une application web moderne développée avec **TypeScript** et **Vite**, offrant une exploration complète du monde du cinéma en utilisant l'API [TMDB](https://www.themoviedb.org/).

## Fonctionnalités Principales

- **Catalogue Populaire** : Présentation des films tendance sous forme de grille avec système de chargement fluide.
- **Recherche Dynamique** : Barre de recherche instantanée avec optimisation des requêtes (délai de 400ms).
- **Fiches Complètes** : Affichage détaillé des genres, durées, notes et résumés pour chaque film.
- **Interface Adaptative** : Design moderne et responsive avec DaisyUI et Tailwind CSS.
- **Thème Personnalisable** : Basculement entre mode clair et sombre pour un confort visuel adapté.

## Stack Technique

- **Frontend** : TypeScript, HTML5, CSS3
- **Tooling** : Vite.js
- **API** : TMDB API (v3) [[voir la doc](https://developers.themoviedb.org/3)]
- **Design** : Tailwind CSS + DaisyUI

## Structure du Projet

- **src/** : Scripts TypeScript de l'application (main.ts).
- **index.html** : Page principale de l'application.
- **style.css** : Fichier de configuration des styles Tailwind et DaisyUI.
- **package.json** : Fichier de gestion des dépendances et scripts.

## Installation et Lancement

1. Télécharger le projet

2. Installer les dépendances :
   ```bash
   pnpm install
   ```

3. Remplacer le contenu de `src/main.ts` par le fichier fourni

4. Démarrer l'application :
   ```bash
   pnpm dev
   ```

## Auteur

Justin Lefebvre