import { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import BoarDisplay from "./BoardDisplay";
import { Board, isValidBoard, WorkerBuilder } from "./Processor";

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

    const instance = new WorkerBuilder();

    useEffect(() => {
        instance.onmessage = () => {
            console.log("received fro web worker");
        };

        return () => {
            console.log("terminate");
            instance.terminate();
        };
    });

    return (
        <SolverDiv>
            <button
                onClick={() => {
                    instance.postMessage(5);
                }}
            />
            <h1>{JSON.stringify(isValidBoard(board))}</h1>
            <ImageDisplayBorder>
                <BoarDisplay board={board} onCellSave={onCellSave} />
            </ImageDisplayBorder>
        </SolverDiv>
    );
}
