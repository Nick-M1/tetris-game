import {useEffect, useRef, useState} from "react";
import {Action} from "../logic/Input";


const MIN_SWIPE_DISTANCE = 25


export default function useTouch() {
    const touchStart = useRef<number | null>(null)
    const touchEnd = useRef<number | null>(null)

    const [directions, setDirections] = useState<Action[]>([])


    const onTouchStart = (e: TouchEvent) => {
        touchEnd.current = null
        touchStart.current = (e.touches[0].clientX)
    }

    const onTouchMove = (e: TouchEvent) => {
        touchEnd.current = (e.targetTouches[0].clientX)

        if (!touchStart.current || !touchEnd.current)
            return

        const distance = touchStart.current - touchEnd.current
        const isLeftSwipe = distance > MIN_SWIPE_DISTANCE
        const isRightSwipe = distance < -MIN_SWIPE_DISTANCE


        if (isLeftSwipe) {
            touchStart.current = (e.touches[0].clientX)
            setDirections(prevState => [...prevState, Action.Left])
        }

        if (isRightSwipe) {
            touchStart.current = (e.touches[0].clientX)
            setDirections(prevState => [...prevState, Action.Right])
        }
    }


    // Add event listeners
    useEffect(() => {
        window.addEventListener("touchstart", onTouchStart, { capture: true });
        window.addEventListener("touchmove", onTouchMove, { capture: true });

        return () => {
            window.removeEventListener("touchstart", onTouchStart, { capture: true });
            window.removeEventListener("touchmove", onTouchMove, { capture: true });
        };
    }, []);

    return directions
}