import {GAME_OVER_AUDIO, getRandomThemeSong} from "../constants/audio-constants";
import {useEffect} from "react";

export default function useAudio(isPaused: boolean, isGameover: boolean) {
    useEffect(() => {
        const themeSongAudio = new Audio(getRandomThemeSong())
        themeSongAudio.loop = true

        const gameoverAudio = new Audio(GAME_OVER_AUDIO)

        if (isGameover) {
            themeSongAudio.pause()
            gameoverAudio.play()

        } else if (isPaused) {
            themeSongAudio.pause()

        } else {
            themeSongAudio.play()
        }

        return () => themeSongAudio.pause()
    }, [isPaused, isGameover])
}