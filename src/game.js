const { Board } = require('./board');
const { Player } = require('./player');

module.exports.Game = class Game {
  constructor(height, width) {
    this.board = new Board({height, width});
    this.player1 = new Player('Player 1', 'X');
    this.player2 = new Player('Player 2', 'O');
    this.players = [this.player1, this.player2];
    this.currentPlayerIndex = 0;
  }

  get currentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  print() {
    this.board.print();
  }

  setNextPlayer() {
    this.currentPlayerIndex = (this.currentPlayerIndex  + 1) % 2;
  }

  readPlayerInput(input) {
    const column = parseInt(input);
    if (!isFinite(column)) {
      return {error: 'Input should be a number'};
    }
    if (column < 0) {
      return {error: 'Input should be greater of equal than 0'};
    }
    if (column > this.board.width) {
      return {error: `Input should be less than ${this.board.width}`};
    }
    return {column};
  }

  dropChip(column) {
    if (!this.board.canDropChip(column)) {
      return {error: `Cannot drop on column ${column}`};
    }
    return {row: this.board.dropChip(column, this.currentPlayer.chip)};
  }

  testWinner(row, column) {
    const hasConnectedChips = this.board.testConnectedChips(row, column, this.currentPlayer.chip, 4);
    if (hasConnectedChips) {
      return {winner: `${this.currentPlayer.name} winned!`};
    }
    return {winner: null};
  }
};
