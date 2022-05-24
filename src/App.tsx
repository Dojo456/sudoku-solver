import { useState } from "react";
import Popup from "reactjs-popup";
import styled from "styled-components";
import "./App.css";
import AnnieFrown from "./helper/AnnieFrown";
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
