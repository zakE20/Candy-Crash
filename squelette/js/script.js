import Grille from "./grille.js";
import LevelManager from "./LevelManager.js";
import Level from "./Level.js";

// 1 On définit une sorte de "programme principal"
// le point d'entrée du code qui sera appelée dès que la
// page ET SES RESSOURCES sont chargées

window.onload = init;

let grille;

function init() {
  console.log("Page et ressources prêtes à l'emploi");
  // appelée quand la page et ses ressources sont prêtes.
  // On dit aussi que le DOM est ready (en fait un peu plus...)
  grille = new Grille(9, 9);

  
  const niveaux = [
    new Level(1, {
      mouvementsMax: 20,
      // Objectif : obtenir au moins 1500 points dans 20movements 
      objectif: (gameState) => gameState.score >= 1500
    }),
    new Level(2, {
      mouvementsMax: 25,
      // Objectif Niveau 2 : collecter au moins 10 croissants (cookies de type 0)
      objectif: (gameState) => gameState.nbCroissant >= 10
    })
  ];
  const levelManager = new LevelManager(niveaux, grille);
  grille.levelManager = levelManager;

  grille.showCookies();
}
