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
    const [showPopup, setShowPopup] = useState<{
        showPopup: boolean;
        reason: string | undefined;
    }>({ showPopup: false, reason: undefined });

    const onPreviewError = (
        event: React.SyntheticEvent<HTMLImageElement, Event>,
        reason: string
    ) => {
        setShowPopup({
            showPopup: true,
            reason: reason,
        });
    };

    const closePopup = () => {
        setShowPopup({ showPopup: false, reason: undefined });
    };

    return (
        <Main>
            <Popup
                open={showPopup.showPopup}
                onClose={closePopup}
                closeOnDocumentClick
                modal
            >
                <AnnieFrown reason="that is not a valid " />
            </Popup>
            <Header>For My Poggers Girlfriend</Header>
            <Solver onPreviewError={onPreviewError}></Solver>
        </Main>
    );
}

export default App;
