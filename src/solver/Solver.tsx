import { ReactElement, useState } from "react";
import styled from "styled-components";
import BoarDisplay from "./BoardDisplay";
import { Board, getProcessor, isValidBoard } from "./Processor";

const SolverDiv = styled.div`
    position: relative;
    align-items: center;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1 1 auto;
    width: 100%;
    height: auto;
`;

const ImageDisplayBorder = styled.div`
    background-color: white;
    border-style: solid;
    border-color: purple;
    width: 40vh;
    height: 40vh;
    overflow: hidden;
`;

const SolveButton = styled.button`
    font-size: 30px;
    margin: 10px;
`;

export default function Solver(): ReactElement {
    const emptyBoard: Board = new Array(9);
    emptyBoard.fill(new Array<number | null>(9).fill(null));

    const [board, setBoard] = useState(emptyBoard);

    const onCellSave = (value: number, row: number, column: number) => {
        setBoard((board) => {
            return board.map((cellRow, i) => {
                return cellRow.map((cell, j) => {
                    if (i === row && j === column) {
                        return isNaN(value) ? null : value;
                    } else {
                        return cell;
                    }
                });
            });
        });
    };

    const processor = getProcessor();

    processor.onMessage = (message) => {
        console.log("received fro web worker", message);
    };

    const onSolveButtonClick = () => {
        processor.solveBoard(board).then((value) => {
            setBoard(value);
        });
    };

    return (
        <SolverDiv>
            <SolveButton
                disabled={!isValidBoard(board)}
                onClick={onSolveButtonClick}
            >
                Solve
            </SolveButton>
            <ImageDisplayBorder>
                <BoarDisplay board={board} onCellSave={onCellSave} />
            </ImageDisplayBorder>
        </SolverDiv>
    );
}
