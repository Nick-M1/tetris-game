import {memo} from "react";

type Props = {
    gameStats: GameStats
}

const GameStats = ({ gameStats }: Props) => {
    const { level, points, linesCompleted, linesPerLevel } = gameStats;
    const linesToLevel = linesPerLevel - linesCompleted;

    return (
        <ul className="p-4 absolute w-[22vw] right-0 bottom-0 text-left text-purple-300 font-kanit-bold game-board-light">
            <li>Level</li>
            <li className="mb-2 text-white text-5xl tabular-nums font-outline-1">{level}</li>
            <li>Lines to level</li>
            <li className="mb-2 text-white text-5xl tabular-nums font-outline-1">{linesToLevel}</li>
            <li>Points</li>
            <li className="mb-2 text-white text-5xl tabular-nums font-outline-1">{points}</li>
        </ul>
    );
};

export default memo(GameStats);
