export default class LevelManager {
  /**
   * @param {Array<Level>} levels - Tableau des niveaux
   * @param {Grille} grille - Instance de la grille du jeu
   */
  constructor(levels, grille) {
    this.levels = levels;
    this.grille = grille;
    this.niveauActuel = 0;
    this.updateInterfaceNiveau();
  }

  updateInterfaceNiveau() {
    const niveauDiv = document.querySelector("#infos div:nth-child(3)");
    if (niveauDiv) {
      niveauDiv.textContent = `Niveau : ${this.niveauActuel + 1}`;
    }

    // Pour le niveau 2 (index 1), afficher le compteur de croissants,
    // sinon le cacher
    const croissantCounter = document.getElementById("croissant-counter");
    if (this.niveauActuel === 1) {
      croissantCounter.style.display = "block";
      croissantCounter.textContent = "Croissants restants : " + (10 - this.grille.nbCroissant);
    } else {
      croissantCounter.style.display = "none";
    }
  }

  getGameState() {
    return {
      score: this.grille.score,
      moves: this.grille.moves,
      nbCroissant: this.grille.nbCroissant || 0
    };
  }

  verifierEtChangerNiveau() {
    const currentLevel = this.levels[this.niveauActuel];
    const gameState = this.getGameState();

    if (currentLevel.estReussi(gameState)) {
      alert(`Niveau ${currentLevel.numero} réussi !`);
      this.niveauActuel++;
      if (this.niveauActuel < this.levels.length) {
        if (this.levels[this.niveauActuel].mouvementsMax) {
          this.grille.moves = this.levels[this.niveauActuel].mouvementsMax;
          document.getElementById("mouvements").textContent = "Moves: " + this.grille.moves;
        }
        //réinitialiser le compteur de croissants pour le niveau suivant
        this.grille.nbCroissant = 0;
        this.updateInterfaceNiveau();
      } else {
        alert("Félicitations, vous avez terminé tous les niveaux !");
      }
    } else if (gameState.moves <= 0) {
      alert(`Mouvements épuisés pour le niveau ${currentLevel.numero}.`);
    }
  }
}
