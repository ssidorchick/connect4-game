const emptyCellValue = ' ';

module.exports.Board = class Board {
  constructor({instance, height, width}) {
    if (!instance) {
      this.height = height;
      this.width = width;
      this.instance = Array(this.height)
        .fill([])
        .map(() => Array(this.width).fill(emptyCellValue));
    } else {
      this.instance = instance;
      this.height = this.instance.length;
      this.width = this.instance[0].length;
    }
  }

  print() {
    for (let i = 0; i < this.height; i++) {
      console.log(this.instance[i]);
    }
  }

  canDropChip(i) {
    return this.instance[0][i] === emptyCellValue;
  }

  dropChip(j, value) {
    let i = this.height - 1;
    while (this.instance[i][j] !== emptyCellValue) {
      i--;
    }
    this.instance[i][j] = value;
    return i;
  }

  testConnectedChips(i, j, chip, connectedCount) {
    return this._testConnectedChipsVertically(i, j, chip, connectedCount) ||
           this._testConnectedChipsHorizontally(i, j, chip, connectedCount) ||
           this._testConnectedChipsDiagonally45(i, j, chip, connectedCount) ||
           this._testConnectedChipsDiagonally135(i, j, chip, connectedCount);
  }

  _testConnectedChipsVertically(i, j, chip, connectedCount) {
    let count = 1;
    let iUp = i - 1;
    while (iUp >= 0 &&
           this.instance[iUp][j] === chip) {
      count++;
      iUp--;
    }
    let iDown = i + 1;
    while (iDown < this.height &&
           this.instance[iDown][j] === chip) {
      count++;
      iDown++;
    }
    return count === connectedCount;
  }

  _testConnectedChipsHorizontally(i, j, chip, connectedCount) {
    let count = 1;
    let jLeft = j - 1;
    while (jLeft >= 0 &&
           this.instance[i][jLeft] === chip) {
      count++;
      jLeft--;
    }
    let jRight = j + 1;
    while (jRight < this.width &&
           this.instance[i][jRight] === chip) {
      count++;
      jRight++;
    }
    return count === connectedCount;
  }

  _testConnectedChipsDiagonally45(i, j, chip, connectedCount) {
    let count = 1;
    let jLeft = j - 1;
    let iDown = i + 1;
    while (jLeft >= 0 &&
           iDown < this.height &&
           this.instance[iDown][jLeft] === chip) {
      count++;
      jLeft--;
      iDown++;
    }
    let jRight = j + 1;
    let iUp = i - 1;
    while (jRight < this.width &&
           iUp >= 0 &&
           this.instance[iUp][jRight] === chip) {
      count++;
      jRight++;
      iUp--;
    }
    return count === connectedCount;
  }

  _testConnectedChipsDiagonally135(i, j, chip, connectedCount) {
    let count = 1;
    let jLeft = j - 1;
    let iUp = i - 1;
    while (jLeft >= 0 &&
           iUp >= 0 &&
           this.instance[iUp][jLeft] === chip) {
      count++;
      jLeft--;
      iUp--;
    }
    let jRight = j + 1;
    let iDown = i + 1;
    while (jRight < this.width &&
           iDown < this.height &&
           this.instance[iDown][jRight] === chip) {
      count++;
      jRight++;
      iDown++;
    }
    return count === connectedCount;
  }
};
