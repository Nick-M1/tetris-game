import { useState, useEffect } from "react";
import {buildBoard, nextBoard} from "../logic/Board";


type HookReturn = [Board]

export function useBoard(rows: number, columns: number, player: Player, resetPlayer: () => void, addLinesCleared: (lines: number) => void): HookReturn {
    const [board, setBoard] = useState(buildBoard(rows, columns));

    useEffect(() => {
        setBoard((previousBoard) =>
            nextBoard(
                previousBoard,
                player,
                resetPlayer,
                addLinesCleared
            )
        );
    }, [player, resetPlayer, addLinesCleared]);

    return [board];
}
