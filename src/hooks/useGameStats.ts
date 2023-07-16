import { useState, useCallback } from "react";
import {ROW_CLEARED_AUDIO} from "../constants/audio-constants";

type HookReturn = [
    GameStats,
    (lines: number) => void
]

const buildGameStats: () => GameStats = () => ({
    level: 1,
    linesCompleted: 0,
    linesPerLevel: 10,
    points: 0
});

export function useGameStats(): HookReturn {
    const [gameStats, setGameStats] = useState(buildGameStats());

    const addLinesCleared = useCallback((lines: number) => {
        setGameStats((previous) => {
            const points = previous.points + lines * 100;
            const { linesPerLevel } = previous;
            const newLinesCompleted = previous.linesCompleted + lines;
            const level = newLinesCompleted >= linesPerLevel
                    ? previous.level + 1
                    : previous.level;
            const linesCompleted = newLinesCompleted % linesPerLevel;

            return {
                level,
                linesCompleted,
                linesPerLevel,
                points
            };
        });

        new Audio(ROW_CLEARED_AUDIO).play()     //todo Extra sound if lines > 1 ???
    }, []);

    return [gameStats, addLinesCleared];
}
