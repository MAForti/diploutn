// Variables

const board = document.querySelector("#board");
const data = document.querySelector("#data");
const wrapper = document.querySelector("#wrapper");
const maxCells = 9;

let sel = [];
let player = "X";
let win = false;

function init() {
  // Reinicio las variables
  board.innerHTML = "";
  data.innerHTML = "";
  wrapper.classList.remove("wrapper");
  wrapper.classList.add("hidden")
  data.classList.add("hidden")
  sel = [];
  player = "X";
  win = false;
  // Creo la grilla
  for (let i = 0; i < maxCells; i++) {
    // Creo el elemento, le asigno una clase, un id, y un eventlistener
    let content = "";
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.id = `${i}`;
    cell.addEventListener("click", () => {
      click(i);
    });
    // Mostrar el simbolo del jugador actual en hover
    cell.addEventListener("mouseover", () => {
      if (!cell.textContent && !win) {
        cell.classList.add(player);
      }
    });
    cell.addEventListener("mouseout", () => {
      cell.classList.remove(player);
    });
    // Inseto el elemento en el parent
    board.appendChild(cell);
    sel.push("");
  }
}

// Comprueba si hay un ganador con una matriz de combinaciones predefinida
// Si es asi, devuelve el ganador

const handleWin = () => {
  const combinations = [
    // Filas
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columnas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonales
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const comb of combinations) {
    const [a, b, c] = comb;
    // Si para la combinacion actual los 3 valores son iguales, es porque hay un ganador.
    if (
      sel[a].player &&
      sel[a].player === sel[b].player &&
      sel[a].player === sel[c].player
    ) {
      return [sel[a], sel[b], sel[c]]; // Devuelvo el ganador
    }
  }

  // Compruebo si el array se quedo sin valores, si no, devuelvo null
  return !sel.includes("") ? "emp" : null;
};

const click = (i) => {
  // Compruebo si el array se quedo sin espacios vacios y
  // si es una victoria, si no, asigno el jugador actual
  console.log(sel);

  if (!sel[i] && !win) {
    let el = document.getElementById(i);
    // Guardo el elemento y jugador en el array
    sel[i] = { player, el };
    // Elimino el estilado para el hover, y dejo el valor del jugador actual
    el.setAttribute("data-current", player);
    el.classList.remove(player);
    el.innerText = player;
    const winner = handleWin();
    if (winner) {
      win = true;
      // Boton para reiniciar el juego
      const button = document.createElement("button");
        button.addEventListener("click", () => {
          init();
        });
        button.className = "button";
        button.innerText = "Reiniciar";
        const text = document.createElement("p");
      if (winner === "emp") {
        text.classList.add("gameTie");
        text.innerText = "Empate...";
      } else {
        text.classList.add("gameWinner");
        // No es recomendable usar innerHTML, pero para hacerlo mas rapido yo aca lo uso
        text.innerHTML = `Ganador: <span>${player}</span>`;
        winner.forEach((item) => {
          item.el.classList.add("winner");
          item.el.style.pointerEvents = "none";
        });
      }
      // Muestro y creo los elementos del resultado
      wrapper.classList.add("wrapper");
      wrapper.classList.remove("hidden")
      data.classList.remove("hidden")
      data.appendChild(text);
      data.appendChild(button);
      // Cambio el estilado de los perdedores
      let loosers = document.querySelectorAll(".cell:not(.winner)");
      loosers.forEach((item) => {
        item.classList.add("looser");
        item.style.pointerEvents = "none";
      });
    } else {
      player = player === "X" ? "O" : "X";
    }
  }
};

init();
