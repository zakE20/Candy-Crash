import Cookie from "./cookie.js";
import { create2DArray } from "./utils.js";

// Classe représentant la grille du jeu
export default class Grille {
  cookieSelectionnes = []; // Tableau pour stocker les cookies sélectionnés

  // Constructeur de la grille
  constructor(l, c) {
    this.c = c; // Nombre de colonnes
    this.l = l; // Nombre de lignes
    this.score = 0; // Score du joueur
    this.tabcookies = this.remplirTableauDeCookies(6); // Remplir la grille avec des cookies
  }

  // Afficher les cookies dans la grille
  showCookies() {
    let grilleDiv = document.querySelector("#grille");
    grilleDiv.innerHTML = ""; // Vider la grille avant de réafficher les cookies

    for (let l = 0; l < this.l; l++) {
      for (let c = 0; c < this.c; c++) {
        let cookie = this.tabcookies[l][c];

        if (!cookie) continue; // Ignorer les cases vides

        let img = cookie.htmlImage;
        img.onclick = () => this.handleCookieClick(l, c); // Ajouter un événement de clic sur l'image

        let newDiv = document.createElement("div");
        newDiv.appendChild(img);
        grilleDiv.appendChild(newDiv);
      }
    }
  }

  // Gérer le clic sur un cookie
  handleCookieClick(ligne, colonne) {
    let cookie = this.tabcookies[ligne][colonne];

    if (cookie.isSelectionnee()) {
        cookie.deselectionnee(); // Désélectionner le cookie
        this.cookieSelectionnes = [];
        return;
    }

    cookie.selectionnee(); // Sélectionner le cookie
    this.cookieSelectionnes.push(cookie);

    if (this.cookieSelectionnes.length === 2) {
        let cookie1 = this.cookieSelectionnes[0];
        let cookie2 = this.cookieSelectionnes[1];

        console.log(`🔄 Tentative de swap entre (${cookie1.ligne},${cookie1.colonne}) et (${cookie2.ligne},${cookie2.colonne})`);

        Cookie.swapCookies(cookie1, cookie2); //swap les cookies

        // Mettre à jour les coordonnées des cookies après le swap
        [cookie1.ligne, cookie1.colonne, cookie2.ligne, cookie2.colonne] = [cookie2.ligne, cookie2.colonne, cookie1.ligne, cookie1.colonne];

        console.log("Vérification des alignements après swap");
        setTimeout(() => {
            let cookiesAEliminer = this.detecterAlignements(); // Détecter les alignements

            if (cookiesAEliminer.length > 0) {
                console.log("Alignements détectés, suppression en cours");
                this.eliminerAlignements(); // Éliminer les alignements
            } else {
                console.log("Aucun alignement détecté, annulation du swap.");
                Cookie.swapCookies(cookie1, cookie2); // Annuler l'échange si aucun alignement

                // Remettre à jour les coordonnées des cookies après l'annulation du swap
                [cookie1.ligne, cookie1.colonne, cookie2.ligne, cookie2.colonne] = [cookie2.ligne, cookie2.colonne, cookie1.ligne, cookie1.colonne];
            }

            this.cookieSelectionnes = [];
        }, 100); // Ajout d'un délai pour permettre à l'interface utilisateur de se mettre à jour
    }
}

  //remplir la grille avec des cookies aléatoires
  remplirTableauDeCookies(nbDeCookiesDifferents) {
    let tab = create2DArray(this.l);

    for (let l = 0; l < this.l; l++) {
        for (let c = 0; c < this.c; c++) {
            const type = Math.floor(Math.random() * nbDeCookiesDifferents);
            tab[l][c] = new Cookie(type, l, c);
            console.log(`Cookie créé en (${l}, ${c}) avec type ${type}`);
        }
    }

    return tab;
}

updateScore(points) {
  this.score += points; // Utiliser this.score
  // Mettre à jour le score dans le HTML
  const scoreDiv = document.getElementById('score');
  if (scoreDiv) {
    scoreDiv.textContent = "Score : " + this.score; // Utiliser this.score
  }
}
  //detecter les alignements de cookies
  detecterAlignements() {
    let cookiesAEliminer = [];

    console.log("Début de la détection des alignements...");

    // Vérification horizontale
    for (let l = 0; l < this.l; l++) {
        for (let c = 0; c < this.c - 2; c++) {
            let cookie1 = this.tabcookies[l][c];
            let cookie2 = this.tabcookies[l][c + 1];
            let cookie3 = this.tabcookies[l][c + 2];

            console.log(`Vérification horizontale en (${l}, ${c}): ${cookie1?.type}, ${cookie2?.type}, ${cookie3?.type}`);

            if (cookie1 && cookie2 && cookie3 && cookie1.type === cookie2.type && cookie2.type === cookie3.type) {
                console.log(`Alignement horizontal détecté en (${l}, ${c}), (${l}, ${c + 1}), (${l}, ${c + 2})`);
                cookiesAEliminer.push(cookie1, cookie2, cookie3);
            }
        }
    }

    // Vérification verticale
    for (let c = 0; c < this.c; c++) {
        for (let l = 0; l < this.l - 2; l++) {
            let cookie1 = this.tabcookies[l][c];
            let cookie2 = this.tabcookies[l + 1][c];
            let cookie3 = this.tabcookies[l + 2][c];

            console.log(`Vérification verticale en (${l}, ${c}): ${cookie1?.type}, ${cookie2?.type}, ${cookie3?.type}`);

            if (cookie1 && cookie2 && cookie3 && cookie1.type === cookie2.type && cookie2.type === cookie3.type) {
                console.log(`Alignement vertical détecté en (${l}, ${c}), (${l + 1}, ${c}), (${l + 2}, ${c})`);
                cookiesAEliminer.push(cookie1, cookie2, cookie3);
            }
        }
    }

    console.log(`Total de cookies détectés à supprimer : ${cookiesAEliminer.length}`);
    return cookiesAEliminer;
}
 

  // Éliminer les alignements de cookies
  eliminerAlignements() {
    let cookiesAEliminer = this.detecterAlignements();

    if (cookiesAEliminer.length > 0) {
      console.log("🗑 Suppression des cookies :", cookiesAEliminer.map(c => `(${c.ligne}, ${c.colonne})`));
      let points = 0;
    if (cookiesAEliminer.length === 3) {
      points = 60;
    } else if (cookiesAEliminer.length === 4) {
      points = 120;
    } else if (cookiesAEliminer.length >= 5) {
      points = 200;
    }
    this.updateScore(points);
      cookiesAEliminer.forEach(cookie => {
        let { ligne, colonne } = cookie;
        this.tabcookies[ligne][colonne] = null; // Supprimer le cookie dans la grille
      });

      this.descendreCookies(); // Faire descendre les cookies
      setTimeout(() => this.eliminerAlignements(), 500); // Répéter l'élimination apres un délai
    } else {
      console.log("Aucun cookie à supprimer.");
      this.showCookies(); //afficher les cookies
    }
  }

  descendreCookies() {
    console.log("Mise à jour de la grille après suppression");

    for (let c = 0; c < this.c; c++) {
        for (let l = this.l - 1; l >= 0; l--) {
            if (this.tabcookies[l][c] === null) {
                console.log(`Case vide détectée à (${l}, ${c}), déplacement en cours`);

                for (let k = l; k > 0; k--) {
                    this.tabcookies[k][c] = this.tabcookies[k - 1][c];
                    if (this.tabcookies[k][c]) {
                        this.tabcookies[k][c].ligne = k;
                        console.log(`Cookie déplacé en (${k}, ${c}) avec type ${this.tabcookies[k][c].type}`);
                    }
                    this.tabcookies[k - 1][c] = null;
                }

                if (!this.tabcookies[0][c]) {
                    this.tabcookies[0][c] = new Cookie(Math.floor(Math.random() * 6), 0, c);
                    console.log(`Nouveau cookie généré en (${0}, ${c}) avec type ${this.tabcookies[0][c].type}`);
                }
            }
        }
    }

    this.showCookies(); // Afficher les cookies
}
  // Éliminer les cookies dans la première colonne
  eliminerCookiesPremCol() {
    for (let l = 0; l < this.l - 2; l++) {
      let cookie1 = this.tabcookies[l][0];
      let cookie2 = this.tabcookies[l + 1][0];
      let cookie3 = this.tabcookies[l + 2][0];

      if (cookie1 && cookie2 && cookie3 && cookie1.type === cookie2.type && cookie2.type === cookie3.type) {
        this.tabcookies[l][0] = null;
        this.tabcookies[l + 1][0] = null;
        this.tabcookies[l + 2][0] = null;
      }
    }
    this.descendreCookies(); //descendre les cookies
  }
  
}