const { Board } = require('./board');

describe('Board', () => {
  test('should return true when can drop a chip', () => {
    const instance = [
      [' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' '],
      ['X', ' ', ' ', ' '],
    ];

    const board = new Board({instance});
    const result = board.canDropChip(0);
    expect(result).toBe(true);
  });

  test('should return false when cannot drop a chip', () => {
    const instance = [
      ['O', ' ', ' ', ' '],
      ['X', ' ', ' ', ' '],
      ['O', ' ', ' ', ' '],
      ['X', ' ', ' ', ' '],
    ];

    const board = new Board({instance});
    const result = board.canDropChip(0);
    expect(result).toBe(false);
  });

  test('should allow to drop a chip', () => {
    const instance = [
      [' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' '],
      ['X', ' ', ' ', ' '],
    ];
    const expectedInstance = [
      [' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' '],
      ['O', ' ', ' ', ' '],
      ['X', ' ', ' ', ' '],
    ];

    const board = new Board({instance});
    const result = board.dropChip(0, 'O');
    expect(result).toBe(2);
    expect(board.instance).toEqual(expectedInstance);
  });

  describe('should return true when 3 chips connected vertically', () => {
    test('test 1', () => {
      const instance = [
        [' ', ' ', ' ', ' '],
        ['X', ' ', ' ', ' '],
        ['X', ' ', ' ', ' '],
        ['X', ' ', ' ', ' '],
      ];
      const board = new Board({instance});
      const result = board.testConnectedChips(1, 0, 'X', 3);
      expect(result).toBe(true);
    });

    test('test 2', () => {
      const instance = [
        ['X', ' ', ' ', ' '],
        ['X', ' ', ' ', ' '],
        ['X', ' ', ' ', ' '],
        ['O', ' ', ' ', ' '],
      ];
      const board = new Board({instance});
      const result = board.testConnectedChips(0, 0, 'X', 3);
      expect(result).toBe(true);
    });
  });

  describe('should return true when 3 chips connected horizontally', () => {
    test('test 1', () => {
      const instance = [
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
        ['X', 'X', 'X', ' '],
      ];
      const board = new Board({instance});
      const result = board.testConnectedChips(3, 0, 'X', 3);
      expect(result).toBe(true);
    });

    test('test 2', () => {
      const instance = [
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
        [' ', 'X', 'X', 'X'],
      ];
      const board = new Board({instance});
      const result = board.testConnectedChips(3, 3, 'X', 3);
      expect(result).toBe(true);
    });

    test('test 3', () => {
      const instance = [
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
        [' ', 'X', 'X', 'X'],
      ];
      const board = new Board({instance});
      const result = board.testConnectedChips(3, 2, 'X', 3);
      expect(result).toBe(true);
    });
  });

  describe('should return true when 3 chips connected diagonally 45°', () => {
    test('test 1', () => {
      const instance = [
        [' ', ' ', ' ', ' '],
        [' ', ' ', 'X', ' '],
        [' ', 'X', 'O', ' '],
        ['X', 'O', 'X', ' '],
      ];
      const board = new Board({instance});
      const result = board.testConnectedChips(3, 0, 'X', 3);
      expect(result).toBe(true);
    });

    test('test 2', () => {
      const instance = [
        [' ', ' ', ' ', 'X'],
        [' ', ' ', 'X', 'X'],
        [' ', 'X', 'O', 'O'],
        ['O', 'O', 'X', 'X'],
      ];
      const board = new Board({instance});
      const result = board.testConnectedChips(1, 2, 'X', 3);
      expect(result).toBe(true);
    });
  });

  describe('should return true when 3 chips connected diagonally 135°', () => {
    test('test 1', () => {
      const instance = [
        [' ', ' ', ' ', ' '],
        ['X', ' ', ' ', ' '],
        ['X', 'X', ' ', ' '],
        ['O', 'O', 'X', ' '],
      ];
      const board = new Board({instance});
      const result = board.testConnectedChips(1, 0, 'X', 3);
      expect(result).toBe(true);
    });

    test('test 2', () => {
      const instance = [
        [' ', 'X', ' ', ' '],
        [' ', 'O', 'X', ' '],
        [' ', 'X', 'O', 'X'],
        [' ', 'O', 'X', 'O'],
      ];
      const board = new Board({instance});
      const result = board.testConnectedChips(2, 3, 'X', 3);
      expect(result).toBe(true);
    });
  });

  describe('should return false when 3 chips are not connected vertically', () => {
    test('test 1', () => {
      const instance = [
        ['O', ' ', ' ', ' '],
        ['X', ' ', ' ', ' '],
        ['O', ' ', ' ', ' '],
        ['X', ' ', ' ', ' '],
      ];
      const board = new Board({instance});
      const result = board.testConnectedChips(0, 0, 'X', 3);
      expect(result).toBe(false);
    });

    test('test 2', () => {
      const instance = [
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
        [' ', ' ', 'X', ' '],
        [' ', ' ', 'X', ' '],
      ];
      const board = new Board({instance});
      const result = board.testConnectedChips(2, 2, 'X', 3);
      expect(result).toBe(false);
    });
  });

  describe('should return false when 3 chips are not connected horizontally', () => {
    test('test 1', () => {
      const instance = [
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
        ['X', 'X', ' ', ' '],
      ];
      const board = new Board({instance});
      const result = board.testConnectedChips(0, 0, 'X', 3);
      expect(result).toBe(false);
    });

    test('test 2', () => {
      const instance = [
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
        [' ', 'O', 'X', 'X'],
      ];
      const board = new Board({instance});
      const result = board.testConnectedChips(2, 2, 'X', 3);
      expect(result).toBe(false);
    });
  });
});
