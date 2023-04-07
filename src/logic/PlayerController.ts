import {hasCollision, isWithinBoard} from "./Board";
import {rotate} from "./Tetrominoes";
import {Action} from "./Input";
import Board from "../components/Board";
import {Dispatch, SetStateAction} from "react";


// Try to rotate player
const attemptRotation = (board: Board, player: Player, setPlayer: Dispatch<SetStateAction<Player>>) => {
    const shape = rotate(
        player.tetromino.shape,
        1
    );

    const position = player.position;
    const isValidRotation = isWithinBoard( board, position, shape ) && !hasCollision( board, position, shape );

    if (isValidRotation) {
        setPlayer({
            ...player,
            tetromino: {
                ...player.tetromino,
                shape
            }
        });
    } else {
        return false;
    }
};

export const movePlayer = (delta: Position, position: Position, shape: number[][], board: Board) => {
    const desiredNextPosition = {
        row: position.row + delta.row,
        column: position.column + delta.column
    }

    const collided = hasCollision(
        board,
        desiredNextPosition,
        shape
    )

    const isOnBoard = isWithinBoard(
        board,
        desiredNextPosition,
        shape
    )

    const preventMove = !isOnBoard || (isOnBoard && collided);
    const nextPosition = preventMove ? position : desiredNextPosition;

    const isMovingDown = delta.row > 0;
    const isHit = isMovingDown && (collided || !isOnBoard);

    return { collided: isHit, nextPosition };
};

const attemptMovement = (board: Board, player: Player, setPlayer: Dispatch<SetStateAction<Player>>, action: Action, setGameOver: Dispatch<SetStateAction<boolean>>) => {
    const delta = { row: 0, column: 0 };
    let isFastDropping = false;

    switch (action) {
        case Action.FastDrop:
            isFastDropping = true
            break
        case Action.SlowDrop:
            delta.row += 1
            break
        case Action.Left:
            delta.column -= 1
            break
        case Action.Right:
            delta.column += 1
            break
    }

    const { collided, nextPosition } = movePlayer(
        delta,
        player.position,
        player.tetromino.shape,
        board
    );

    // Did we collide immediately? If so, game over, man!
    const isGameOver = collided && player.position.row === 0;
    if (isGameOver)
        setGameOver(isGameOver);


    setPlayer({
        ...player,
        collided,
        isFastDropping,
        position: nextPosition
    });
};

export const playerController = (action: Action, board: Board, player: Player, setPlayer: Dispatch<SetStateAction<Player>>, setGameOver: Dispatch<SetStateAction<boolean>> ) => {
    action === Action.Rotate
        ? attemptRotation( board, player, setPlayer )
        : attemptMovement( board, player, setPlayer, action, setGameOver );
};
