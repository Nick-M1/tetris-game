import { useState, useCallback, useEffect } from "react";


type HookReturn = [
    number | null,
    () => void,
    () => void
]

const DEFAULT_DROP_TIME = 1000;
const MINIMUM_DROP_TIME = 100;
const SPEED_INCREMENT = 50;

export function useDropTime(gameStats: GameStats): HookReturn {
    const [dropTime, setDropTime] = useState<number | null>(DEFAULT_DROP_TIME);
    const [previousDropTime, setPreviousDropTime] = useState<number | null | undefined>();

    const resumeDropTime = useCallback(() => {
        if (!previousDropTime) {
            return;
        }
        setDropTime(previousDropTime);
        setPreviousDropTime(null);
    }, [previousDropTime]);

    const pauseDropTime = useCallback(() => {
        if (dropTime) {
            setPreviousDropTime(dropTime);
        }
        setDropTime(null);
    }, [dropTime, setPreviousDropTime]);

    useEffect(() => {
        const speed = SPEED_INCREMENT * (gameStats.level - 1);
        const newDropTime = Math.max(DEFAULT_DROP_TIME - speed, MINIMUM_DROP_TIME);

        setDropTime(newDropTime);
    }, [gameStats.level, setDropTime]);

    return [dropTime, pauseDropTime, resumeDropTime];
}
