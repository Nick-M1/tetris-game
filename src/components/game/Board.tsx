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
        <div className="m-auto grid w-[45vh] h-[90vh] game-board" style={boardStyles}>
            {board.rows.map((row, y) =>
                row.map((cell, x) => (
                    <BoardCell key={x * board.size.columns + x} cell={cell} />
                ))
            )}
        </div>
    );
};

export default Board;
