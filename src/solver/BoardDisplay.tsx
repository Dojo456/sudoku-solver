import { ReactElement, useContext } from "react";
import styled from "styled-components";
import { HelperContext, HelperContextInterface } from "../helper/Helper";
import { Board } from "./Processor";

const BoardTable = styled.table`
    table-layout: fixed;
    width: 100%;
    height: 100%;
    color: black;
    box-sizing: border-box;
    border-collapse: collapse;
`;

const BoardRow = styled.tr`
    border: 1px solid grey;
    box-sizing: border-box;
    border-collapse: collapse;
`;

const SpecialBoardRow = styled(BoardRow)`
    border-bottom: 2px solid black;
`;

const BoardCell = styled.td`
    border: 1px solid grey;
    box-sizing: border-box;
    border-collapse: collapse;
    white-space: nowrap;
`;

const SpecialBoardCell = styled(BoardCell)`
    border-right: 2px solid black;
`;

const CellInput = styled.input`
    box-sizing: border-box;
    display: block;
    height: 100%;
    width: 100%;
    border: none;
    font-size: calc(5px + 2vmin);
    text-align: center;
    &:focus {
        outline-style: solid;
    }
`;

interface BoardDisplayProps {
    board: Board;
    onCellSave(value: number, x: number, y: number): void;
}

export default function BoarDisplay(props: BoardDisplayProps): ReactElement {
    const { board, onCellSave } = props;
    const context = useContext<HelperContextInterface>(HelperContext);

    const invalidValue = (value: string): boolean => {
        if (value === "") {
            return false;
        } else {
            const parsed = parseInt(value);

            return (
                value === null ||
                value.length > 1 ||
                isNaN(parsed) ||
                parsed < 1
            );
        }
    };

    const onCellInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;

        if (invalidValue(value)) {
            context.showErrorPopup("that's not a valid input");

            event.currentTarget.value = "";
        } else {
            // 1 in 10 chance of doing stupid shit
            if (Math.random() < 0.1) {
                context.showInfoPopup(
                    "that's teh stupidest input i've ever seen. why would you put that"
                );
            }
        }
    };

    return (
        <BoardTable>
            <tbody>
                {board.map((row, rowIndex) => {
                    const RowStyle =
                        (rowIndex + 1) % 3 === 0 ? SpecialBoardRow : BoardRow;

                    return (
                        <RowStyle key={rowIndex}>
                            {row.map((number, columnIndex) => {
                                const CellStyle =
                                    (columnIndex + 1) % 3 === 0
                                        ? SpecialBoardCell
                                        : BoardCell;

                                return (
                                    <CellStyle key={columnIndex}>
                                        <CellInput
                                            type="text"
                                            value={
                                                number === null ? "" : number
                                            }
                                            onChange={onCellInputChange}
                                            onChangeCapture={(event) => {
                                                const value =
                                                    event.currentTarget.value;

                                                if (!invalidValue(value)) {
                                                    onCellSave(
                                                        parseInt(value),
                                                        rowIndex,
                                                        columnIndex
                                                    );
                                                }
                                            }}
                                        />
                                    </CellStyle>
                                );
                            })}
                        </RowStyle>
                    );
                })}
            </tbody>
        </BoardTable>
    );
}
