import {movePlayer} from "./PlayerController";
import {defaultCell} from "./Cell";
import {transferToBoard} from "./Tetrominoes";


export function buildBoard(rows: number, columns: number): Board {
    const builtRows: Cell[][] = Array.from({ length: rows }, () =>
        Array.from({ length: columns }, () => ({ ...defaultCell }))
    );

    return {
        rows: builtRows,
        size: { rows, columns }
    };
}

const findDropPosition = (board: Board, position: Position, shape: number[][]): Position => {
    let max = board.size.rows - position.row + 1;
    let row = 0;

    for (let i = 0; i < max; i++) {
        const delta = { row: i, column: 0 };
        const result = movePlayer(delta, position, shape, board)
        const { collided } = result;

        if (collided)
            break;


        row = position.row + i;
    }

    return { ...position, row };
};


export const nextBoard = (board: Board, player: Player, resetPlayer: () => void, addLinesCleared: (lines: number) => void) => {
    const { tetromino, position } = player;

    // Copy and clear spaces used by pieces that hadn't collided and occupied spaces permanently
    let rows = board.rows.map((row) =>
        row.map((cell) => (cell.occupied ? cell : { ...defaultCell }))
    );

    // Drop position
    const dropPosition = findDropPosition(
        board,
        position,
        tetromino.shape
    );

    // Place ghost
    const className =  player.isFastDropping ? tetromino.className : "tetromino-base bg-transparent border border-neutral-800"

    rows = transferToBoard(
        className,
        player.isFastDropping,
        false,
        dropPosition,
        rows,
        tetromino.shape
    );

    // Place the piece. If it collided, mark the board cells as collided
    if (!player.isFastDropping) {
        rows = transferToBoard(
            tetromino.className,
            player.collided,
            true,
            position,
            rows,
            tetromino.shape
        );
    }

    // Check for cleared lines
    const blankRow = rows[0].map((_) => ({ ...defaultCell }));
    let linesCleared = 0;
    const newRows: Cell[][] = []
    rows.forEach(row => {
        if (row.every(column => column.occupied)) {
            linesCleared++
            newRows.unshift([...blankRow])
        } else
            newRows.push(row)
    })

    if (linesCleared > 0)
        addLinesCleared(linesCleared);

    // If we collided, reset the player!
    if (player.collided || player.isFastDropping)
        resetPlayer();

    // Return the next board
    return {
        rows: newRows,
        size: { ...board.size }
    };
};

export const hasCollision = (board: Board, position: Position, shape: number[][]) => {
    for (let y = 0; y < shape.length; y++) {
        const row = y + position.row;

        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x]) {
                const column = x + position.column;

                if (
                    board.rows[row] &&
                    board.rows[row][column] &&
                    board.rows[row][column].occupied
                ) {
                    return true;
                }
            }
        }
    }

    return false;
};

export const isWithinBoard = (board: Board, position: Position, shape: number[][]) => {
    for (let y = 0; y < shape.length; y++) {
        const row = y + position.row;

        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x]) {
                const column = x + position.column;
                const isValidPosition = board.rows[row] && board.rows[row][column];

                if (!isValidPosition) return false;
            }
        }
    }

    return true;
};
