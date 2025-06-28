const Gameboard = (function () {
  let gameboard;
  const init = function () {
    gameboard = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  };
  const updateGameboard = function (i1, i2, value) {
    gameboard[i1][i2] = value;
  };

  init();

  return { updateGameboard: updateGameboard, init: init };
})();
