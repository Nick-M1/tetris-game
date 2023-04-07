import {useInterval} from "../../hooks/useInterval";
import {Action, actionForKey} from "../../logic/Input";
import {useDropTime} from "../../hooks/useDropTime";
import {playerController} from "../../logic/PlayerController";
import React, {Dispatch, SetStateAction, useEffect} from "react";
import useKeyPress from "../../hooks/useKeyPress";
import {appendToLeaderboard} from "../../utils/localstorage-leaderboard";

type Props = {
    board: Board
    gameStats: GameStats
    player: Player
    gameOver: boolean
    setGameOver: Dispatch<SetStateAction<boolean>>
    setPlayer: Dispatch<SetStateAction<Player>>
}

function GameController({ board, gameStats, player, gameOver, setGameOver, setPlayer }: Props) {
    const [dropTime, pauseDropTime, resumeDropTime] = useDropTime(gameStats)
    const keysPressed = useKeyPress()

    // Game loop
    useInterval(() => {
        handleInput(Action.SlowDrop);
    }, dropTime!);

    useEffect(() => {
        if (gameOver && dropTime != null) {
            pauseDropTime()
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

    return <></>
}

export default GameController;
