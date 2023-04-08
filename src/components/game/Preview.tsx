import {buildBoard} from "../../logic/Board";
import {transferToBoard} from "../../logic/Tetrominoes";
import BoardCell from "./BoardCell";
import {memo} from "react";

type Props = {
    tetromino: Tetromino
}

const Preview = ({ tetromino }: Props) => {
    const { shape, className } = tetromino;
    const board = buildBoard(4, 4 )

    board.rows = transferToBoard(
        className,
        false,
        true,
        { row: 0, column: 0 },
        board.rows,
        shape
    );

    return (
        <>
            <h3 className='absolute max-sm:bottom-[22vh] max-sm:left-[1.7vh] sm:top-4 sm:right-[4vh] z-[2] max-sm:text-xs font-PressStart2P'>NEXT</h3>
            <div className="absolute max-sm:bottom-[13vh] sm:top-10 sm:right-0 game-board-light">
                <div className="grid grid-rows-4 grid-cols-4 w-[8vh] h-[8vh] sm:w-[120px] sm:h-[120px]">
                    { board.rows.map((row, y) =>
                        row.map((cell, x) => (
                            <BoardCell key={x * board.size.columns + x} cell={cell} />
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default memo(Preview);
