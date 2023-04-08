import {useInterval} from "../../hooks/useInterval";
import {Action, actionForKey} from "../../logic/Input";
import {useDropTime} from "../../hooks/useDropTime";
import {playerController} from "../../logic/PlayerController";
import React, {Dispatch, SetStateAction, useEffect} from "react";
import useKeyPress from "../../hooks/useKeyPress";
import {appendToLeaderboard} from "../../utils/localstorage-leaderboard";
import {Link, useNavigate} from "react-router-dom";
import ArrowRight from "../icons/ArrowRight";
import ArrowRoundPath from "../icons/ArrowRoundPath";
import useTouch from "../../hooks/useTouch";
import useMousePress from "../../hooks/useMousePress";
import PauseIcon from "../icons/PauseIcon";

type Props = {
    board: Board
    gameStats: GameStats
    player: Player
    gameOver: boolean
    setGameOver: Dispatch<SetStateAction<boolean>>
    setPlayer: Dispatch<SetStateAction<Player>>
}

function GameController({ board, gameStats, player, gameOver, setGameOver, setPlayer }: Props) {
    const navigate = useNavigate()
    const [dropTime, pauseDropTime, resumeDropTime] = useDropTime(gameStats)
    const keysPressed = useKeyPress()
    const [touchDirection, fastdrop, setFastdrop] = useTouch()
    const [mouseDown, resetMouseDown] = useMousePress()

    // Game loop
    useInterval(() => {
        handleInput(Action.SlowDrop);
    }, dropTime!);

    useEffect(() => {
        if (gameOver && dropTime != null) {
            pauseDropTime()

            if (gameStats.points !== 0)
                appendToLeaderboard(gameStats.level, gameStats.points)
        }
    }, [gameOver])

    // When key-pressed
    useEffect(() => {
        if (!gameOver)
            keysPressed.forEach(key => {
                const action = actionForKey(key)

                if (action == Action.Pause)
                    dropTime == null ? resumeDropTime() : pauseDropTime()
                else
                    handleInput(action)
            })
    }, [keysPressed])

    // When touch-event
    useEffect(() => {
        if (!gameOver)
            touchDirection.forEach(key => handleInput(key))
    }, [touchDirection])

    // When touch-event
    useEffect(() => {
        if (!gameOver && fastdrop) {
            handleInput(Action.FastDrop)
            setFastdrop(false)
        }
    }, [fastdrop])

    // Mouse press event -> rotation
    useEffect(() => {
        if (!gameOver && dropTime != null && mouseDown) {
            handleInput(Action.Rotate)
            resetMouseDown()

        } else if (mouseDown)
            resetMouseDown()
    }, [mouseDown])



    // Pass gamestate to controller
    const handleInput = (action: Action) => {
        playerController(
            action,
            board,
            player,
            setPlayer,
            setGameOver
        );
    };


    if (dropTime != null)
        return (
            <button onClick={pauseDropTime} className='absolute top-0 right-0 w-7 h-7 m-2 rounded-full bg-purple-500 flex justify-center items-center'>
               <PauseIcon width={20} />
            </button>
        )

    if (gameOver) {
        return (
            <div className='absolute inset-0 bg-black/75 z-20 flex flex-col justify-center items-center space-y-12 font-PressStart2P'>
                <h2 className='text-4xl md:text-6xl'>GAME OVER</h2>

                <div>
                    Final score: { gameStats.points }
                </div>

                <div className='grid grid-cols-2 md:gap-3 text-sm md:text-base'>
                    <div onClick={() => navigate(0)} className='cursor-pointer flex items-center justify-center'>
                        <ArrowRoundPath width={30} className='mr-3'/> RESTART
                    </div>
                    <Link to='/leaderboard' className='flex items-center'>
                        LEADERBOARD <ArrowRight width={30} className='ml-3 animate-bounceRight'/>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div onClick={resumeDropTime} className='absolute inset-0 bg-black/70 z-20 flex justify-center items-center font-PressStart2P text-6xl px-6'>
            GAME PAUSED
        </div>
    )

}

export default GameController;
