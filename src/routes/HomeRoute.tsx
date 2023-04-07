import Game from "../components/game/Game";
import { motion } from "framer-motion";

const ROWS = 20
const COLUMNS = 10

export function Component() {
    return (
        <motion.div initial={{x: "-100%"}}
            animate={{x: "0%"}}
            exit={{x: "-100%"}}
            transition={{duration: 2}}

            className="text-center text-white w-screen h-screen overflow-clip bg-neutral-900">
            <Game rows={ROWS} columns={COLUMNS}/>
        </motion.div>
    )
}