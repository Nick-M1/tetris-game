type Tetromino = {
    shape: number[][],
    className: string
}

type TetrominoesAll = {
    [key: string]: Tetromino
}

type Cell = {
    occupied: boolean
    className: string
    showSparkle: boolean
}

type Board = {
    rows: Cell[][]
    size: {
        rows: number
        columns: number
    }
}

type GameStats = {
    linesCompleted: number
    level: number
    linesPerLevel: number
    points: number
}

type Player = {
    collided: boolean,
    isFastDropping: boolean,
    position: Position,
    tetrominoes: Tetromino[],
    tetromino: Tetromino
}

type Position = {
    row: number
    column: number
}