import {useEffect, useRef, useState} from "react";
import {Action} from "../logic/Input";
import _ from "lodash";


const MIN_SWIPE_DISTANCE_X = 25

const MIN_SWIPE_DISTANCE_Y_SLOWDROP = 25
const MIN_SWIPE_DISTANCE_Y_FASTDROP = 150


export default function useTouch() {
    const touchStartX = useRef<number | null>(null)
    const touchEndX = useRef<number | null>(null)
    const touchStartY = useRef<number | null>(null)
    const touchEndY = useRef<number | null>(null)

    const [directions, setDirections] = useState<Action[]>([])

    const [fastdrop, setFastdrop] = useState(false)
    const setFastdropTrue = _.throttle(() => setFastdrop(true), 2_000)


    const onTouchStart = (e: TouchEvent) => {
        touchEndX.current = null
        touchEndY.current = null
        touchStartX.current = e.touches[0].clientX
        touchStartY.current = e.touches[0].clientY
    }

    const onTouchMove = (e: TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX
        touchEndY.current = e.targetTouches[0].clientY

        if (touchStartY.current && touchEndY.current) {
            const distance = touchStartY.current - touchEndY.current
            const isSwipeDownFastdrop = distance < -MIN_SWIPE_DISTANCE_Y_FASTDROP

            if (isSwipeDownFastdrop) {
                touchStartY.current = null
                setFastdropTrue()
                return

            } else {
                // const isSwipeDownSlowdrop = distance < -MIN_SWIPE_DISTANCE_Y_SLOWDROP
                //
                // if (isSwipeDownSlowdrop) {
                //     // touchStartY.current = e.touches[0].clientY
                //     setDirections(prevState => [...prevState, Action.SlowDrop])
                // }
            }
        }

        if (touchStartX.current && touchEndX.current) {
            const distance = touchStartX.current - touchEndX.current
            const isLeftSwipe = distance > MIN_SWIPE_DISTANCE_X
            const isRightSwipe = distance < -MIN_SWIPE_DISTANCE_X


            if (isLeftSwipe) {
                touchStartX.current = (e.touches[0].clientX)
                setDirections(prevState => [...prevState, Action.Left])
            }

            if (isRightSwipe) {
                touchStartX.current = e.touches[0].clientX
                setDirections(prevState => [...prevState, Action.Right])
            }
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

    return [directions, fastdrop, setFastdrop] as const
}