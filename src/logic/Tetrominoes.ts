export const TETROMINOES: TetrominoesAll = {
    I: {
        shape: [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ],
        className: `tetromino-base bg-cyan-500`
    },
    J: {
        shape: [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ],
        className: `tetromino-base bg-blue-500`
    },
    L: {
        shape: [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]
        ],
        className: `tetromino-base bg-orange-500`
    },
    O: {
        shape: [
            [1, 1],
            [1, 1]
        ],
        className: `tetromino-base bg-yellow-400`
    },
    S: {
        shape: [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ],
        className: `tetromino-base bg-lime-500`
    },
    T: {
        shape: [
            [1, 1, 1],
            [0, 1, 0],
            [0, 0, 0]
        ],
        className: `tetromino-base bg-purple-500`
    },
    Z: {
        shape: [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ],
        className: `tetromino-base bg-pink-500`
    }
};

const TETROMINO_KEYS = Object.keys(TETROMINOES)

export function randomTetromino() {
    const index = Math.floor(Math.random() * TETROMINO_KEYS.length);
    const key = TETROMINO_KEYS[index];
    return TETROMINOES[key];
}

export function rotate(piece: number[][], direction: number) {
    // Transpose rows and columns
    const newPiece = piece.map((_, index) =>
        piece.map((column) => column[index])
    );

    // Reverse rows to get a rotated matrix
    if (direction > 0)
        return newPiece.map((row) => row.reverse());

    return newPiece.reverse();
}

export function transferToBoard(className: string, isOccupied: boolean, showSparkle: boolean, position: Position, rows: Cell[][], shape: number[][]) {
    shape.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell) {
                const occupied = isOccupied;
                const _y = y + position.row;
                const _x = x + position.column;
                rows[_y][_x] = { occupied, showSparkle, className };
            }
        });
    });

    return rows;
}
