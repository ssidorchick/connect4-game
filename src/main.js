const readline = require('readline');
const { Game } = require('./game');

function printPlayer(game) {
  process.stdout.write(`${game.currentPlayer.name} (${game.currentPlayer.chip}) > `);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const game = new Game(5, 6);

printPlayer(game);

rl.on('line', input => {
  const {column, error: inputError} = game.readPlayerInput(input);
  if (inputError) {
    console.log(inputError);
    printPlayer(game);
    return;
  }

  const {row, error: dropError} = game.dropChip(column);
  if (dropError) {
    console.log(dropError);
    printPlayer(game);
    return;
  }

  const {winner} = game.testWinner(row, column);
  if (winner) {
    game.print();
    console.log(winner);
    process.exit(0);
  }

  game.print();
  game.setNextPlayer();
  printPlayer(game);
});
