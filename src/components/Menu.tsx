import background from "../assets/HomePageBackground.jpg"

type Props = {
    onClick: () => void
}

const TITLE_TEXT = [
    { char: 'T', color: 'text-red-500' },
    { char: 'E', color: 'text-orange-500' },
    { char: 'T', color: 'text-yellow-500' },
    { char: 'R', color: 'text-green-500' },
    { char: 'I', color: 'text-cyan-500' },
    { char: 'S', color: 'text-purple-500' },
]

const Menu = ({ onClick }: Props) => (
    <div className="relative w-full h-full flex flex-col justify-center items-center space-y-12 font-PressStart2P bg-home-background bg-bottom bg-cover">
        <h1 className='text-6xl md:text-8xl font-bold'>
            { TITLE_TEXT.map(({ char, color }, index) =>
                <span key={index} className={color}>{char}</span>
            )}
        </h1>

        <button className="button-cyan" onClick={onClick}>
            START GAME
        </button>
    </div>
);

export default Menu;
