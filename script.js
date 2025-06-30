const GameBoard = (function () {
  let gameboard;
  const init = function () {
    gameboard = [null, null, null, null, null, null, null, null, null];
  };

  const checkWinner = function () {
    return winningCombos.some((combo) => {
      const first = gameboard[combo[0]];
      if (first == null) {
        return false;
      }
      return combo.every((index) => gameboard[index] === first);
    });
  };

  const updateGameboard = function (i, value) {
    if (i <= 8) {
      gameboard[i] = value;
    }
  };

  init();
  return {
    updateGameboard: updateGameboard,
    init: init,
    checkWinner: checkWinner,
  };
})();

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Player = function (name) {
  let playerName = name;
  let points = 0;
  const incrementPoints = function () {
    this.points = ++points;
  };
  return {
    name: playerName,
    points: points,
    incrementPoints: incrementPoints,
  };
};

(function () {
  const GameRounds = {
    turn: 1,
    players: [],
    init: function () {
      this.renderFunctions();
      this.functions();
      this.cacheDom();
      this.bindEvents();
    },
    cacheDom: function () {
      this.gameButtons = document.querySelectorAll("div.game-container>button");
      this.resetButton = document.querySelector("#reset");
    },
    functions: function () {
      this.createPlayer = function (name) {
        if (this.players.length < 2) {
          this.players.push(new Player(name));
        } else {
          throw Error("More than 2 players created");
        }
      };
      this.resetBoard = function () {
        GameBoard.init();
        this.gameButtons.forEach((button) => {
          button.innerText = "";
          button.disabled = false;
          this.turn = 1;
        });
      };
    },
    bindEvents: function () {
      this.resetButton.addEventListener("click", () => this.resetBoard());
      this.gameButtons.forEach((button) => {
        button.addEventListener("click", () => {
          this.renderButtonClick(button);
          GameBoard.updateGameboard(button.id - 1, button.innerText);
          if (GameBoard.checkWinner()) {
            alert("We have a winner");
            this.resetBoard();
          }
          button.disabled = true;
        });
      });
    },
    renderFunctions: function () {
      this.renderButtonClick = function (button) {
        if (this.turn % 2 == 0) {
          button.innerText = "O";
          ++this.turn;
        } else {
          button.innerText = "X";
          ++this.turn;
        }
      };
    },
  };

  GameRounds.init();
})();
