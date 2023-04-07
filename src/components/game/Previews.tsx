import {memo} from "react";
import Preview from "./Preview";

type Props = {
    tetrominoes: Tetromino[]
}

const Previews = ({ tetrominoes }: Props) => {
    // We want everything except the last one
    const previewTetromino = tetrominoes.at(-1);
    return <Preview tetromino={previewTetromino!}/>
};

export default memo(Previews);
