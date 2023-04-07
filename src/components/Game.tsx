import Menu from "./Menu";
import Tetris from "./Tetris";
import {useGameOver} from "../hooks/useGameOver";
import {AnimatePresence, motion} from "framer-motion";

type Props = {
    rows: number
    columns: number
}

const Game = ({ rows, columns }: Props) => {
    const [gameOver, setGameOver, resetGameOver] = useGameOver();
    const start = () => resetGameOver();

    const windowHeight = window.innerHeight

    return (
        <AnimatePresence  mode="popLayout" initial={false}>
            { gameOver ? (
                <motion.div layout
                    key="menu"
                    className='w-full h-full'
                    initial={{ y: 0 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                    exit={{ y: -windowHeight }}
                >
                    <Menu onClick={start} />
                </motion.div>
            ) : (
                <motion.div layout
                    key="game-match"
                    className='w-full h-full'
                    initial={{ y: windowHeight }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                    exit={{ y: windowHeight }}
                >
                    <Tetris rows={rows} columns={columns} setGameOver={setGameOver} />
                </motion.div>
            )}
        </AnimatePresence>
    )

};

export default Game;
