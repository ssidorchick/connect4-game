const readline = require('readline');
const { Game } = require('./game');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const game = new Game(5, 6);
rl.on('line', (input) => {
  let [column, value] = input.split(' ');
  column = parseInt(column);
  if (game.canDrop(column)) {
    game.drop(column, value);
    if (game.hasWinner(value)) {
      console.log(`${value} winned`);
      process.exit(0);
    }
  } else {
    console.log('Cannot drop on column', column);
  }
  game.print();
});
