
type Props = {
    cell: Cell
}

const BoardCell = ({ cell }: Props) => (
    <div className={`w-auto relative ${cell.className}`}>
        <div className={`absolute z-10 w-[8px] h-[8px] -left-1 -top-1 rounded-md ${(cell.showSparkle || cell.occupied) && 'bg-white/10'}`}></div>
    </div>
);

export default BoardCell;
