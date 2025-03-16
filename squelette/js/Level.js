export default class Level {
  constructor(numero, options) {
    this.numero = numero;
    this.mouvementsMax = options.mouvementsMax || null;
    // La fonction objectif retourne true si l'état de jeu satisfait l'objectif(script)
    this.objectif = options.objectif;
  }

  estReussi(gameState) {
    return this.objectif(gameState);
  }
}
