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
    overflow: hidden;
`;

const SpecialBoardCell = styled(BoardCell)`
    border-right: 2px solid black;
`;

interface BoardDisplayProps {
    board: Board;
}

export default function BoarDisplay(props: BoardDisplayProps): ReactElement {
    const { board } = props;
    const context = useContext<HelperContextInterface>(HelperContext);

    const onCellInputChange = (
        event: React.FormEvent<HTMLTableCellElement>
    ) => {
        const value = event.currentTarget.textContent;

        console.log(value);

        // @ts-expect-error value is type string, but is NaN for reason is typed to accept number???
        // that doesn't make sense
        if (value === null || value.length > 1 || isNaN(value)) {
            context.showErrorPopup("that's not a valid input");

            event.currentTarget.textContent = "";
        } else {
            // 1 in 10 chance of doing stupid shit
            if (Math.random() < 0.1) {
                context.showErrorPopup(
                    "that's teh stupidest input i've ever seen. why would you put that"
                );
            }
        }
    };

    return (
        <BoardTable>
            <tbody>
                {board.map((row, index) => {
                    const RowStyle =
                        (index + 1) % 3 === 0 ? SpecialBoardRow : BoardRow;

                    return (
                        <RowStyle key={index}>
                            {row.map((number, index) => {
                                const CellStyle =
                                    (index + 1) % 3 === 0
                                        ? SpecialBoardCell
                                        : BoardCell;

                                return (
                                    <CellStyle
                                        contentEditable="true"
                                        onInput={onCellInputChange}
                                    >
                                        {number}
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
