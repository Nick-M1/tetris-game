import BoardCell from "./BoardCell";

type Props = {
    board: Board
}

const Board = ({ board }: Props) => {
    const boardStyles = {
        gridTemplateRows: `repeat(${board.size.rows}, 1fr)`,
        gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`
    };

    return (
        <div className="w-[30vh] h-[60vh] sm:w-[45vh] sm:h-[90vh] sm:m-auto grid game-board" style={boardStyles}>
            {board.rows.map((row, y) =>
                row.map((cell, x) => (
                    <BoardCell key={x * board.size.columns + x} cell={cell} />
                ))
            )}
        </div>
    );
};

export default Board;
