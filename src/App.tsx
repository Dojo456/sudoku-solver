import { useState } from "react";
import Popup from "reactjs-popup";
import styled from "styled-components";
import "./App.css";
import AnnieFrown from "./helper/AnnieFrown";
import { Board, Square } from "./solver/Models";
import Solver from "./solver/Solver";

const Main = styled.div`
    background-color: cornflowerblue;
    display: flex;
    flex-flow: column;
    height: 100vh;
    align-items: center;
    text-align: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
`;

const Header = styled.header`
    background-color: white;
    padding: 20px;
    flex: 0 1 auto;
    color: cornflowerblue;
    width: 100%;
`;

function App() {
    const [popupState, setPopupState] = useState<{
        showPopup: boolean;
        reason: string | undefined;
    }>({ showPopup: false, reason: undefined });

    const onPreviewError = (
        event: React.SyntheticEvent<HTMLImageElement, Event>,
        reason: string
    ) => {
        setPopupState({
            showPopup: true,
            reason: reason,
        });
    };

    const closePopup = () => {
        setPopupState({ showPopup: false, reason: undefined });
    };

    const squares: Square[][] = new Array(3);

    for (let i = 0; i < 3; i++) {
        squares[i] = new Array(3);

        for (let j = 0; j < 3; j++) {
            let counter = 0;
            const spaces: number[][] = new Array(3);

            for (let k = 0; k < 3; k++) {
                spaces[k] = new Array(3);
                for (let g = 0; g < 3; g++) {
                    spaces[k][g] = counter;
                    counter++;
                }
            }

            squares[i][j] = new Square(spaces);
        }
    }

    const board = new Board(squares);

    console.log(board.toString());

    return (
        <Main>
            <Popup
                open={popupState.showPopup}
                onClose={closePopup}
                closeOnDocumentClick
                modal
            >
                <AnnieFrown
                    reason={popupState.reason ? popupState.reason : ""}
                />
            </Popup>
            <Header>For My Poggers Girlfriend</Header>
            <Solver onPreviewError={onPreviewError}></Solver>
        </Main>
    );
}

export default App;
