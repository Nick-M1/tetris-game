import {memo} from "react";

type Props = {
    gameStats: GameStats
}

const GameStats = ({ gameStats }: Props) => {
    const { level, points, linesCompleted, linesPerLevel } = gameStats;
    const linesToLevel = linesPerLevel - linesCompleted;

    return (
        <div className="px-4 py-2 sm:p-4 absolute w-full sm:w-[22vw] max-sm:left-0 sm:right-0 bottom-0 text-left text-purple-300 font-kanit-bold game-board-light max-sm:flex max-sm:justify-between">
            <div>
                <p>Level</p>
                <p className="mb-2 text-white text-4xl sm:text-5xl tabular-nums font-outline-1">{level}</p>
            </div>

            <div>
                <p>Lines to level</p>
                <p className="mb-2 text-white text-4xl sm:text-5xl tabular-nums font-outline-1">{linesToLevel}</p>
            </div>

            <div>
                <p>Points</p>
                <p className="mb-2 text-white text-4xl sm:text-5xl tabular-nums font-outline-1">{points}</p>
            </div>
        </div>
    );
};

export default memo(GameStats);
