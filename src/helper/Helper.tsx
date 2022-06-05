import React, { ReactElement, useState } from "react";
import Popup from "reactjs-popup";
import styled from "styled-components";
import { default as CenterPopup } from "./CenterPopup";

export interface HelperContextInterface {
    showErrorPopup(person: PopupPerson, message: string, ms?: number): void;
    showInfoPopup(
        person: PopupPerson,
        message: string,
        ms?: number,
        closeOn?: Promise<any>
    ): void;
}

export const HelperContext = React.createContext<HelperContextInterface>({
    showErrorPopup: () => {},
    showInfoPopup: () => {},
});

const annieFrown = require("../assets/annie-frown.jpg");
const partyCarson = require("../assets/party-carson.png");
const staringSam = require("../assets/staring-sam.jpg");

export enum PopupPerson {
    AnnieFrown,
    PartyCarson,
    StaringSam,
}

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

function getPersonPopupElement(
    person: PopupPerson,
    reason: string
): ReactElement {
    let imageUrl: string = "";
    let alt: string = "";

    switch (person) {
        case PopupPerson.AnnieFrown:
            imageUrl = annieFrown;
            alt = "annie frown :((";
            break;
        case PopupPerson.PartyCarson:
            imageUrl = partyCarson;
            alt = "party carson!!";
            break;
        case PopupPerson.StaringSam:
            imageUrl = staringSam;
            alt = "sam is peering into your soul";
    }

    return <CenterPopup imageUrl={imageUrl} alt={alt} reason={reason} />;
}

export default function Helper(props: any): ReactElement {
    const [popupState, setPopupState] = useState<{
        showPopup: boolean;
        person: ReactElement | undefined;
    }>({ showPopup: false, person: undefined });

    const showErrorPopup = (person: PopupPerson, reason: string) => {
        switch (person) {
            case PopupPerson.AnnieFrown:
                reason =
                    reason +
                    ", annie is disappointed in you for tyring to break the app (she talks in third person)";
        }

        setPopupState({
            showPopup: true,
            person: getPersonPopupElement(person, reason),
        });
    };

    const showInfoPopup = (
        person: PopupPerson,
        reason: string,
        ms?: number,
        closeOn?: Promise<any>
    ) => {
        setPopupState({
            showPopup: true,
            person: getPersonPopupElement(person, reason),
        });

        if (ms) {
            setTimeout(closePopup, ms);
        }

        if (closeOn) {
            closeOn.then(closePopup);
        }
    };

    const closePopup = () => {
        setPopupState({ showPopup: false, person: undefined });
    };

    return (
        <HelperContext.Provider
            value={{
                showErrorPopup: showErrorPopup,
                showInfoPopup: showInfoPopup,
            }}
        >
            <Popup
                open={popupState.showPopup}
                onClose={closePopup}
                closeOnDocumentClick
                modal
            >
                <CloseButton onClick={closePopup}>X</CloseButton>
                {popupState.person}
            </Popup>
            {props.children}
        </HelperContext.Provider>
    );
}
