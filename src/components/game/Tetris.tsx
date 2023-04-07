import {useGameStats} from "../../hooks/useGameStats";
import {usePlayer} from "../../hooks/usePlayer";
import {useBoard} from "../../hooks/useBoard";
import Board from "./Board";
import GameStats from "./GameStats";
import Previews from "./Previews";
import GameController from "./GameController";
import {Dispatch, SetStateAction, useEffect} from "react";

type Props = {
    rows: number
    columns: number
    gameOver: boolean
    setGameOver: Dispatch<SetStateAction<boolean>>
}

const Tetris = ({ rows, columns, gameOver, setGameOver }: Props) => {
    const [gameStats, addLinesCleared] = useGameStats();
    const [player, setPlayer, resetPlayer] = usePlayer();
    const [board] = useBoard(
        rows,
        columns,
        player,
        resetPlayer,
        addLinesCleared
    );


    return (
        <div className='w-full h-full bg-indigo-950 p-6'>
            <div className='absolute inset-0 bg-activegame-background blur-xs'/>
            <GameController
                board={board}
                gameStats={gameStats}
                player={player}
                gameOver={gameOver}
                setGameOver={setGameOver}
                setPlayer={setPlayer}
            />

            <div className="relative">
                <Board board={board} />
                <GameStats gameStats={gameStats} />
                <Previews tetrominoes={player.tetrominoes} />
            </div>
        </div>
    );
};

export default Tetris;
