import {useState, useCallback, Dispatch, SetStateAction} from "react";

type HookReturn = [
    boolean,
    Dispatch<SetStateAction<boolean>>,
    () => void
]

export function useGameOver(): HookReturn {
    const [gameOver, setGameOver] = useState(false);

    const resetGameOver = useCallback(() => {
        setGameOver(false);
    }, []);

    return [gameOver, setGameOver, resetGameOver];
}
