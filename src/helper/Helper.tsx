import React, { ReactElement, useState } from "react";
import Popup from "reactjs-popup";
import styled from "styled-components";
import AnnieFrown from "./AnnieFrown";

export interface HelperContextInterface {
    showErrorPopup(message: string): void;
}

export const HelperContext = React.createContext<HelperContextInterface>({
    showErrorPopup: () => {},
});

const CloseButton = styled.button`
    color: #fff;
    text-decoration: none;
    outline: none;
    background-color: #999;
    position: absolute;
    top: -8px;
    right: -8px;
    font-size: 30px;
    border-radius: 100%;
    border: 2px solid #333;
    &:hover {
        color: #000;
        cursor: pointer;
    }
`;

export default function Helper(props: any): ReactElement {
    const [popupState, setPopupState] = useState<{
        showPopup: boolean;
        reason: string | undefined;
    }>({ showPopup: false, reason: undefined });

    const showErrorPopup = (reason: string) => {
        setPopupState({
            showPopup: true,
            reason: reason,
        });
    };

    const closePopup = () => {
        setPopupState({ showPopup: false, reason: undefined });
    };

    return (
        <HelperContext.Provider value={{ showErrorPopup: showErrorPopup }}>
            <Popup
                open={popupState.showPopup}
                onClose={closePopup}
                closeOnDocumentClick
                modal
            >
                <CloseButton onClick={closePopup}>X</CloseButton>
                <AnnieFrown
                    reason={popupState.reason ? popupState.reason : ""}
                />
            </Popup>
            {props.children}
        </HelperContext.Provider>
    );
}
