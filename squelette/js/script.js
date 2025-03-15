// script.js
import Grille from "./grille.js";
import Level from "./Level.js";
import LevelManager from "./LevelManager.js";

window.onload = init;

let grille;

function init() {
  console.log("Page et ressources prêtes à l'emploi");

  // Créer la grille avec un paramètre temporaire null pour levelManager
  grille = new Grille(9, 9, null);

  // Définir les niveaux (ici, un seul niveau en exemple)
  const niveaux = [
    new Level(1, {
      mouvementsMax: 20,
      // Objectif : obtenir au moins 1500 points
      objectif: (gameState) => gameState.score >= 1500
    })
    // Tu peux ajouter d'autres niveaux ici
  ];

  // Créer l'instance du LevelManager et l'associer à la grille
  const levelManager = new LevelManager(niveaux, grille);
  grille.levelManager = levelManager;

  // Afficher la grille
  grille.showCookies();
}
