
## Description

Ce projet est une version simplifiée du jeu Candy Crush développée en JavaScript, HTML et CSS. Il utilise des **divs** pour afficher la grille et des images pour représenter les bonbons. L'objectif est de créer des combinaisons de 3 bonbons identiques ou plus en les échangeant.

## Fonctionnalités Actuelles

- Génération d'une **grille** de 9x9 remplie de cookies.
- Création d'une classe `Cookie` qui gère les bonbons avec leurs images et interactions.
- Possibilité de **sélectionner** et **échanger** deux cookies adjacents.
- Affichage de l'interface avec le **score, le temps et le niveau**.

## Fonctionnalités à Implémenter

### 1️-Détection des combinaisons//ok
- Vérifier si un mouvement entraîne un alignement **horizontal** ou **vertical** de 3 cookies ou plus.
- Mettre en place une fonction qui détecte les **combinaisons valides** après chaque échange.

### 2️-Suppression des combinaisons et mise à jour de la grille
- Supprimer les cookies formant une combinaison.
- Faire **descendre** les cookies du dessus pour combler l’espace vide.
- Générer de **nouveaux cookies** pour remplir la grille.

### 3️-Gestion du score et du niveau
- Ajouter un système de **score** qui augmente lorsqu’un joueur fait une combinaison.
- Définir des **objectifs de niveau** (ex : atteindre un score donné pour passer au niveau suivant).

### 4️-Animation des déplacements et suppressions
- Animer les **échanges de cookies**.
- Ajouter un effet **d’éclatement** lors de la suppression des cookies.
- Animer la **descente des nouveaux cookies**.

### 5️-Gestion du temps et des objectifs
- Ajouter un **compteur de temps** limitant la partie (ex : 60 secondes).
- Ajouter des **objectifs spécifiques** (ex : supprimer un certain type de cookie).

### 6️-Vérification automatique de la fin de partie
- Vérifier s'il reste des mouvements possibles.
- Ajouter une option de **mélange aléatoire** si aucun mouvement n'est possible.

### 7️-Effets sonores et visuels
- Ajouter un **effet sonore** lors des swaps et suppressions.
- Ajouter un **effet visuel** (ex : surbrillance des cookies sélectionnés).

### 8️-Mode mobile (responsive design)
- Adapter l’interface aux écrans mobiles.
- Rendre les interactions compatibles avec le **tactile**.

### 9️-Ajout d’éléments spéciaux
- Introduire des **cookies spéciaux** (ex : bombes qui explosent des zones, cookies arc-en-ciel qui suppriment tous les bonbons d’une couleur).

### 10-Sauvegarde et chargement du jeu
- Implémenter une **sauvegarde automatique** du score et du niveau.
- Permettre au joueur de **reprendre sa partie** après un rafraîchissement de la page.

**Statut du projet** : En développement 🛠

