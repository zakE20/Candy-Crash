// LevelManager.js
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
  }

  verifierEtChangerNiveau() {
    const currentLevel = this.levels[this.niveauActuel];
    const gameState = {
      score: this.grille.score,
      moves: this.grille.moves
    };

    if (currentLevel.estReussi(gameState)) {
      alert(`Niveau ${currentLevel.numero} réussi !`);
      this.niveauActuel++;
      if (this.niveauActuel < this.levels.length) {
        //reinitialiser les mouvements pour le niveau suivant s'il y a une limite définie
        if (this.levels[this.niveauActuel].mouvementsMax) {
          this.grille.moves = this.levels[this.niveauActuel].mouvementsMax;
          document.getElementById("mouvements").textContent = "Moves: " + this.grille.moves;
        }
        this.updateInterfaceNiveau();
      } else {
        alert("Félicitations, vous avez terminé tous les niveaux !");
      }
    } else if (gameState.moves <= 0) {
      alert(`Mouvements épuisés pour le niveau ${currentLevel.numero}.`);
    }
  }
}
