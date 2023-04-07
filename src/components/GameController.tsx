import {useInterval} from "../hooks/useInterval";
import {Action, actionForKey} from "../logic/Input";
import {useDropTime} from "../hooks/useDropTime";
import {playerController} from "../logic/PlayerController";
import React, {Dispatch, SetStateAction, useEffect} from "react";
import useKeyPress from "../hooks/useKeyPress";

type Props = {
    board: Board
    gameStats: GameStats
    player: Player
    setGameOver: Dispatch<SetStateAction<boolean>>
    setPlayer: Dispatch<SetStateAction<Player>>
}

function GameController({ board, gameStats, player, setGameOver, setPlayer }: Props) {
    const [dropTime, pauseDropTime, resumeDropTime] = useDropTime(gameStats)
    const keysPressed = useKeyPress()

    // Game loop
    useInterval(() => {
        handleInput(Action.SlowDrop);
    }, dropTime!);

    // When key-pressed
    useEffect(() => {
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
