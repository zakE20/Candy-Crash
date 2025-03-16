export default class Level {
  /**
   * @param {number} numero - Numéro du niveau
   * @param {object} options - Options du niveau (mouvementsMax, objectif, etc.)
   */
  constructor(numero, options) {
    this.numero = numero;
    this.mouvementsMax = options.mouvementsMax || null;
    // La fonction objectif reçoit l'état actuel du jeu et doit retourner true si l'objectif est atteint.
    this.objectif = options.objectif;
  }

  estReussi(gameState) {
    return this.objectif(gameState);
  }
}
