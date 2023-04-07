import {useEffect, useState} from "react";

export default function useKeyPress(): string[] {
    const [keysPressed, setKeysPressed] = useState<string[]>([]);

    const downHandler = ({ code }: KeyboardEvent) => setKeysPressed(prevState => [...prevState, code]);
    const upHandler = ({ code }: KeyboardEvent) =>  setKeysPressed(prevState => prevState.filter(keyItem => keyItem != code));


    // Add event listeners
    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);

        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    }, []);

    return keysPressed;
}