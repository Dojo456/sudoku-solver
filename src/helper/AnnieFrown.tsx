import { ReactElement } from "react";
import styled from "styled-components";

const annieFrown = require("../assets/annie-frown.jpg");

interface AnnieFrownProps {
    reason: string; // reason for showing this error
}

const PopupDiv = styled.div`
    max-width: 60vh;
    max-height: 60vh;
`;

const PopupSpan = styled.span`
    display: flex;
    flex-direction: column;
    border: solid;
    background-color: white;
`;

function AnnieFrown(props: AnnieFrownProps): ReactElement {
    return (
        <PopupDiv>
            <PopupSpan>
                <img src={annieFrown} alt="annie frowning :(" />
                <p>
                    {props.reason}, annie is disappointed in you for tyring to
                    break the app (she talks in third person)
                </p>
            </PopupSpan>
        </PopupDiv>
    );
}

export default AnnieFrown;
