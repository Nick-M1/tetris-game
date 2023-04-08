import NavButtonRight from "../components/shared/NavButtonRight";
import {Link} from "react-router-dom";


const TITLE_TEXT = [
    { char: 'T', color: 'text-red-500' },
    { char: 'E', color: 'text-orange-500' },
    { char: 'T', color: 'text-yellow-500' },
    { char: 'R', color: 'text-green-500' },
    { char: 'I', color: 'text-cyan-500' },
    { char: 'S', color: 'text-purple-500' },
]

export function Component() {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center space-y-12 font-PressStart2P bg-black bg-home-background bg-bottom bg-cover">
            <NavButtonRight text='LEADERBOARD' to='/leaderboard'/>

            <h1 className='text-6xl md:text-8xl font-bold'>
                {TITLE_TEXT.map(({char, color}, index) =>
                    <span key={index} className={color}>{char}</span>
                )}
            </h1>

            <Link to='/game' className="button-cyan">
                START GAME
            </Link>
        </div>
    )
}