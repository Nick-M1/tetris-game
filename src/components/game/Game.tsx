import Menu from "../../pages/Menu";
import Tetris from "./Tetris";
import {useGameOver} from "../../hooks/useGameOver";
import {AnimatePresence, motion} from "framer-motion";
import {useState} from "react";

type Props = {
    rows: number
    columns: number
}

const Game = ({ rows, columns }: Props) => {
    const [homeMenu, setHomeMenu] = useState(true)

    const [gameOver, setGameOver, resetGameOver] = useGameOver();
    const start = () => {
        resetGameOver()
        setHomeMenu(false)
    };

    return (
        <AnimatePresence  mode="popLayout" initial={false}>
            { homeMenu ? (
                <motion.div layout
                    key="menu"
                    className='w-full h-full'
                    initial={{ y: "-100%" }}
                    animate={{ y: "0%", zIndex: 10 }}
                    transition={{ duration: 0.75, ease: "easeOut" }}
                    exit={{ y: "-100%", opacity: 1 }}
                >
                    <Menu onClick={start} />
                </motion.div>
            ) : (
                <motion.div layout
                    key="game-match"
                    className='w-full h-full'
                    initial={{ y: "0%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.75, ease: "easeOut" }}
                    exit={{ y: "0%", opacity: 1 }}
                >
                    <Tetris rows={rows} columns={columns} gameOver={gameOver} setGameOver={setGameOver} />
                </motion.div>
            )}
        </AnimatePresence>
    )
};

export default Game;
