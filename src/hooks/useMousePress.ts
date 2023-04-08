import {useEffect, useState} from "react";

export default function useMousePress() {
    const [mouseDown, setMouseDown] = useState(false);

    const downHandler = (e: MouseEvent) => setMouseDown(true)
    const upHandler = () => setMouseDown(false)


    // Add event listeners
    useEffect(() => {
        window.addEventListener("click", downHandler);

        return () => {
            window.removeEventListener("click", downHandler);
        };
    }, []);

    return [mouseDown, upHandler] as const;
}