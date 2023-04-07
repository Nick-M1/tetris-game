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
        <div className="absolute top-0 left-[80vw] md:left-[72.2vw] game-board-light">
            <div className="grid grid-rows-4 grid-cols-4 w-[120px] h-[120px]">
                {board.rows.map((row, y) =>
                    row.map((cell, x) => (
                        <BoardCell key={x * board.size.columns + x} cell={cell} />
                    ))
                )}
            </div>
        </div>
    );
};

export default memo(Preview);
