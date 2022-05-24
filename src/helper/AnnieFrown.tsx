import { ReactElement } from "react";
import styled from "styled-components";

const annieFrown = require("../assets/annie-frown.jpg");

interface AnnieFrownProps {
    reason: string; // reason for showing this error
}

const PopupSpan = styled.span`
    background-color: white;
    border: solid;
    border-color: white;
    display: flex;
    flex-direction: column;
`;

function AnnieFrown(props: AnnieFrownProps): ReactElement {
    return (
        <PopupSpan>
            <img src={annieFrown} alt="annie frowning :(" />
            <p>
                {props.reason}, annie is disappointed in you for tyring to break
                the app
            </p>
        </PopupSpan>
    );
}

export default AnnieFrown;
