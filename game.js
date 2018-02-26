module.exports.Game = class Game {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.board = Array(height)
      .fill([])
      .map(() => Array(width).fill(''));
  }

  print() {
    for (let i = 0; i < this.board.length; i++) {
      console.log(this.board[i]);
    }
  }

  canDrop(i) {
    return this.board[0][i] === '';
  }

  drop(i, value) {
    let j = this.board.length - 1;
    while (this.board[j][i] !== '') {
      j--;
    }
    this.board[j][i] = value;
  }

  hasWinner(value) {
    return this._testWinnerVertical(value);
  }

  _testWinnerVertical(value) {
    for (let j = 0; j < this.width - 1; j++) {
      let count = 0;
      for (let i = this.height - 1; i >= 0; i--) {
        if (this.board[i][j] === '') {
          break;
        }
        if (this.board[i][j] !== value) {
          count = 0;
        } else {
          count++;
        }
      }
      if (count === 4) {
        return true;
      }
    }
    return false;
  }
};
