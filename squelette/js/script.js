import Grille from "./grille.js";
import LevelManager from "./LevelManager.js";
import Level from "./Level.js";

// 1 On définit une sorte de "programme principal"
// le point d'entrée du code qui sera appelée dès que la
// page ET SES RESSOURCES sont chargées

window.onload = init;

let grille;
grille = new Grille(9, 9);


function init() {
  console.log("Page et ressources prêtes à l'emploi");
  // appelée quand la page et ses ressources sont prêtes.
  // On dit aussi que le DOM est ready (en fait un peu plus...)
  const niveaux = [
    new Level(1, {
      mouvementsMax: 20,
      // Objectif : obtenir au moins 1500 points dans 20movements 
      objectif: (gameState) => gameState.score >= 1500
    })
  ];
  const levelManager = new LevelManager(niveaux, grille);
  grille.levelManager = levelManager;

  grille.showCookies();
}
