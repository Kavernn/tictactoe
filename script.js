const joueurO = "joueur-o";
const joueurX = "joueur-x";
const xClasse = "cell-x";
const cercleClasse = "cell-o";
const textO = "O";
const textX = "X";
const messageGagnant = document.querySelector(".fin-de-partie");
const messageVide = document.querySelector(".cochez-case");
const images = ["imgnulle.png", "imgo.png", "imgx.png"];
const image = document.querySelector(".image-de-jeu");
let isEmpty = true;
const img = new Image();
const div = document.getElementById("image");

//Tous les combinaisons possibles pour gagner une partie de tic tac toe
const combinaisonsPossibles = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellules = document.querySelectorAll(".cellule");

//Variable ici pour déterminer ou non si c'est le tour du o ou du x.
let tourCercle;

//Création de mon évenement click ici au lieu de créer des onClick dans le html, fonction once, true qui me permet de m'assurer qu'on ne peux que cliquer une fois par cellules.
cellules.forEach((cellules) => {
  cellules.addEventListener("click", handleClick, { once: true });
});

function handleClick(e) {
  const cell = e.target;
  const classeCourante = tourCercle ? cercleClasse : xClasse;
  const texteCourant = tourCercle ? "O" : "X";
  placeSymbole(cell, classeCourante, texteCourant);
  if (victoire(classeCourante)) {
    finMatch(false);
  } else if (isNulle()) {
    finMatch(true);
    //ligne ici qui ne sers à rien puisqu'elle ne fonctionne pas, mais je veux vous montrer ce que j'essaye de faire pour désactiver le click
    document.querySelectorAll(".cellule").setAttribute("class", "no-click");
  } else {
    changeTour();
  }
}
//On ajoute ici dans la cellule cliquer l'item qui correspond à la classe soit du X, soit du O
function placeSymbole(cellules, classeCourante, texteCourant) {
  cellules.classList.add(classeCourante) + texteCourant;
}
//Ici, si ce n'est plus au cercle de jouer, c'est au tour du "pas cercle", donc X. Je fais le changement de mon div aussi entre le jouer X et le jouer O dépendemment à quel tour on est rendu.
function changeTour() {
  tourCercle = !tourCercle;
  if (!tourCercle) {
    document.querySelector(".joueur-o").style.display = "none";
    document.querySelector(".joueur-x").style.display = "unset";
  } else {
    document.querySelector(".joueur-x").style.display = "none";
    document.querySelector(".joueur-o").style.display = "unset";
  }
}

//Fonction ici qui fait le tour de mon tableau de combinaison possible et qui reconnait si l'une d'entres-elles sors, pour ainsi déclarer un vainqueur. À noter ici que pour cela, il y a fallu que je sorte du cadre du cours et que je regarde plusieurs vidéos de JavaScript pour m'expliquer comment fouiller dans un tableau de la sorte.
function victoire(classeCourante) {
  return combinaisonsPossibles.some((combinaisons) => {
    return combinaisons.every((index) => {
      return cellules[index].classList.contains(classeCourante);
    });
  });
}

//Fonction qui me sers à vérifier si chacunes de mes cases contiennes soit un élément de ma classe x, soit un élément de ma case o. Si tous le tableau est rempli, ça veux donc dire qu'aucun gagnant n'a été détecté, et donc que la partie est nulle.

function isNulle() {
  return [...cellules].every((cell) => {
    return (
      cell.classList.contains(xClasse) || cell.classList.contains(cercleClasse)
    );
  });
}

//Fonction qui affiche le gagnant (ou la nulle) dans mon div "fin-de-partie" avec l'image approprié
function finMatch(isNulle) {
  if (isNulle) {
    messageGagnant.innerHTML = "Partie nulle !";

    img.onload = function () {};
    div.appendChild(img);
    img.src = "images/imgnulle.png";
  } else {
    messageGagnant.innerHTML = `${tourCercle ? "O gagne !" : "X gagne !"}`;
    if (tourCercle) {
      img.onload = function () {};
      div.appendChild(img);
      img.src = "images/imgo.png";
    } else {
      img.onload = function () {};
      div.appendChild(img);
      img.src = "images/imgx.png";
    }
  }
  messageGagnant.classList.add("fin-de-partie");
  tableauDesactive();
}

//J'essaye ici une autre façon de désactiver les clicks après une fin de partie, mais ça ne semble encore pas fonctionner
function tableauDesactive() {
  if (victoire()) {
    document.querySelector("[cells]").setAttribute("class", "no-click");
  }
}
