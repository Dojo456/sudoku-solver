import { ReactElement, useContext, useState } from "react";
import styled from "styled-components";
import { ShowableAnimations } from "../helper/AnimatedBackground";
import {
    HelperContext,
    HelperContextInterface,
    PopupPerson,
} from "../helper/Helper";
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
    overflow: hidden;
    aspect-ratio: 1 / 1;
`;

const StyledButton = styled.button`
    font-size: 30px;
    margin: 10px;
`;

export default function Solver(): ReactElement {
    const emptyBoard: Board = new Array(9);
    emptyBoard.fill(new Array<number | null>(9).fill(null));

    const [board, setBoard] = useState(emptyBoard);
    const context = useContext<HelperContextInterface>(HelperContext);

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
        const solvePromise = processor.solveBoard(board);

        let solved = false;

        solvePromise.then((value) => {
            solved = true;

            setBoard(value);
        });

        const closePromise = new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                if (solved) {
                    resolve();
                    context.showAnimation(ShowableAnimations.SpinningDakota);
                } else {
                    solvePromise.then(() => {
                        resolve();
                        context.showAnimation(
                            ShowableAnimations.SpinningDakota
                        );
                    });
                }
            }, 2000);
        });

        let person: PopupPerson;
        let message: string;
        if (Math.random() > 0.5) {
            person = PopupPerson.PartyCarson;
            message = "carson is plugging in random numbers until it works";
        } else {
            person = PopupPerson.StaringSam;
            message =
                "our valedictorian Sam is making 1203918232 calculations a minute to find the answer";
        }

        context.showInfoPopup(person, message, undefined, closePromise);
    };

    const onResetButtonClick = () => {
        setBoard(emptyBoard);
    };

    return (
        <SolverDiv>
            <StyledButton
                disabled={!isValidBoard(board)}
                onClick={onSolveButtonClick}
            >
                Solve
            </StyledButton>
            <ImageDisplayBorder>
                <BoarDisplay board={board} onCellSave={onCellSave} />
            </ImageDisplayBorder>
            <StyledButton onClick={onResetButtonClick}>Reset</StyledButton>
        </SolverDiv>
    );
}
