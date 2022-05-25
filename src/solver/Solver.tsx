import { ReactElement, useState } from "react";
import styled from "styled-components";
import BoarDisplay from "./BoardDisplay";
import { Board } from "./Processor";

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

export default function Solver(): ReactElement {
    const emptyBoard: Board = new Array(9);
    emptyBoard.fill(new Array<number | null>(9).fill(null));

    const [board, setBoard] = useState(emptyBoard);

    const onCellSave = (value: number, row: number, column: number) => {
        console.log("saving cell");

        setBoard((board) => {
            return board.map((cellRow, i) => {
                return cellRow.map((cell, j) => {
                    if (i === row && j === column) {
                        return value;
                    } else {
                        return cell;
                    }
                });
            });
        });
    };

    return (
        <SolverDiv>
            <ImageDisplayBorder>
                <BoarDisplay board={board} onCellSave={onCellSave} />
            </ImageDisplayBorder>
        </SolverDiv>
    );
}
