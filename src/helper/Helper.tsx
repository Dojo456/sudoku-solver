import React, { ReactElement, useState } from "react";
import Popup from "reactjs-popup";
import styled from "styled-components";
import AnimatedBackground, { ShowableAnimations } from "./AnimatedBackground";
import { default as CenterPopup } from "./CenterPopup";

export enum PopupPerson {
    AnnieFrown,
    PartyCarson,
    StaringSam,
}

export interface HelperContextInterface {
    showErrorPopup(person: PopupPerson, message: string, ms?: number): void;
    showInfoPopup(
        person: PopupPerson,
        message: string,
        ms?: number,
        closeOn?: Promise<any>
    ): void;
    showAnimation(animation: ShowableAnimations): void;
}

export const HelperContext = React.createContext<HelperContextInterface>({
    showErrorPopup: () => {},
    showInfoPopup: () => {},
    showAnimation: () => {},
});

const annieFrown = require("../assets/annie-frown.jpg");
const partyCarson = require("../assets/party-carson.png");
const staringSam = require("../assets/staring-sam.jpg");

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

const OverlappingDivs = styled.div`
    background-color: transparent;
    position: absolute;
    width: 100%;
    height: 100%;
`;

const BackDiv = styled(OverlappingDivs)`
    z-index: 100;
`;

const FrontDiv = styled(OverlappingDivs)`
    z-index: 110;
    display: flex;
    flex-flow: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    color: white;
`;

const MainDiv = styled.div`
    display: contents;
    position: relative;
    width: 100%;
    height: 100%; ;
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

    const [animationShowing, setAnimationShowing] =
        useState<ShowableAnimations>();

    const showAnimation = (animationToShow: ShowableAnimations) => {
        setAnimationShowing(animationToShow);
    };

    const resetAnimation = () => {
        setAnimationShowing(undefined);
    };

    return (
        <MainDiv>
            <BackDiv>
                <AnimatedBackground
                    animationToShow={animationShowing}
                    onComplete={resetAnimation}
                ></AnimatedBackground>
            </BackDiv>
            <FrontDiv>
                <HelperContext.Provider
                    value={{
                        showErrorPopup: showErrorPopup,
                        showInfoPopup: showInfoPopup,
                        showAnimation: showAnimation,
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
            </FrontDiv>
        </MainDiv>
    );
}
