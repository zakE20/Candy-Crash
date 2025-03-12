
/*cette classe est dédié pour créer les 5 niveaux de mon jeu"*/
export default
class niveau {
    constructor() {
        this.niveau = 1;
    }

    getNiveau() {
        return this.niveau;
    }

    setNiveau(niveau) {
        this.niveau = niveau;
    }

}