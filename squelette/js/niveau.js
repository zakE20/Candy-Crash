// Classe pour un niveau
class Level {
    constructor(number, gridConfig, moves, objectives, obstacles = []) {
      this.number = number;           // Numéro du niveau
      this.gridConfig = gridConfig;   // Paramètres de la grille (ex: { rows: 9, cols: 9, types: 6 })
      this.moves = moves;             // Nombre de coups autorisés
      this.objectives = objectives;   // Objectifs à atteindre (ex: collecter 10 cookies rouges)
      this.obstacles = obstacles;     // Obstacles spécifiques au niveau
    }
  
    init() {
      // Initialiser la grille et les autres éléments du niveau
      console.log(`Initialisation du niveau ${this.number}`);
      // Par exemple, créer une nouvelle instance de ta grille en utilisant gridConfig
    }
  
    checkObjectives() {
      // Vérifier si les objectifs du niveau sont atteints
      // Retourne true si le niveau est terminé, sinon false
    }
  
    update() {
      // Mettre à jour l'état du niveau (nombre de coups restants, progression, etc.)
    }
  }
  
  // Gestionnaire des niveaux
  class LevelManager {
    constructor(levels) {
      this.levels = levels;          // Tableau contenant les différents niveaux
      this.currentLevelIndex = 0;    // Niveau courant
    }
  
    startLevel() {
      const currentLevel = this.levels[this.currentLevelIndex];
      currentLevel.init();
      // Met à jour l'affichage (par exemple, l'info "Niveau" dans ton index.html)
      console.log(`Démarrage du niveau ${currentLevel.number}`);
    }
  
    nextLevel() {
      this.currentLevelIndex++;
      if (this.currentLevelIndex < this.levels.length) {
        this.startLevel();
      } else {
        console.log("Félicitations, tu as terminé tous les niveaux !");
        // Ici, tu peux afficher un message de fin ou réinitialiser le jeu
      }
    }
  
    // Méthode pour vérifier l'état du niveau en cours
    updateCurrentLevel() {
      const currentLevel = this.levels[this.currentLevelIndex];
      if (currentLevel.checkObjectives()) {
        console.log("Objectifs atteints ! Passage au niveau suivant.");
        this.nextLevel();
      } else {
        currentLevel.update();
      }
    }
  }
  
  // Exemple de configuration des niveaux
  const level1 = new Level(
    1,
    { rows: 9, cols: 9, types: 6 },
    20,
    { collect: { color: 'red', count: 10 } }
  );
  
  const level2 = new Level(
    2,
    { rows: 9, cols: 9, types: 6 },
    18,
    { collect: { color: 'blue', count: 12 } }
  );
  
  // Stocker tous les niveaux dans le gestionnaire
  const levelManager = new LevelManager([level1, level2]);
  
  // Démarrer le premier niveau
  levelManager.startLevel();
  
  // Exemple d'appel dans la boucle de jeu ou après chaque coup
  // levelManager.updateCurrentLevel();
  