import { ReactElement } from "react";

const annieFrown = require("../assets/annie-frown.jpg");

interface AnnieFrownProps {
    reason: string; // reason for showing this error
}

function AnnieFrown(props: AnnieFrownProps): ReactElement {
    return (
        <span>
            <img src={annieFrown} alt="annie frowning :(" />
            <p>
                {props.reason}, annie is disappointed in you for tyring to break
                the app
            </p>
        </span>
    );
}

export default AnnieFrown;
