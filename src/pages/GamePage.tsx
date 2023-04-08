import Tetris from "../components/game/Tetris";
import {useState} from "react";

const ROWS = 20
const COLUMNS = 10


export function Component() {
    const [gameOver, setGameOver] = useState(false);

    return (
        <div className="text-center text-white w-screen h-screen overflow-clip bg-neutral-900 overscroll-contain">
            <Tetris rows={ROWS} columns={COLUMNS} gameOver={gameOver} setGameOver={setGameOver} />
        </div>
    )
}