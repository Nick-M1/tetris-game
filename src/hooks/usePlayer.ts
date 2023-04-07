import {useState, useCallback, Dispatch, SetStateAction} from "react";
import {randomTetromino} from "../logic/Tetrominoes";

type HookReturn = [
    Player,
    Dispatch<SetStateAction<Player>>,
    () => void
]

function buildPlayer(previous?: Player): Player {
    let tetrominoes;

    if (previous) {
        tetrominoes = [...previous.tetrominoes];
        tetrominoes.unshift(randomTetromino());
    } else {
        tetrominoes = Array(5)
            .fill(0)
            .map((_) => randomTetromino());
    }

    return {
        collided: false,
        isFastDropping: false,
        position: { row: 0, column: 4 },
        tetrominoes,
        tetromino: tetrominoes.pop()!
    };
}

export function usePlayer(): HookReturn {
    const [player, setPlayer] = useState(buildPlayer());

    const resetPlayer = useCallback(() => {
        setPlayer((prev) => buildPlayer(prev));
    }, []);

    return [player, setPlayer, resetPlayer];
}
