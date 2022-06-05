import { ReactElement } from "react";
import styled from "styled-components";

interface CenterPopupProps {
    reason: string; // reason for showing this error
    imageUrl: string;
    alt: string;
}

const PopupDiv = styled.div`
    max-width: 60vh;
    max-height: 60vh;
    border: solid;
    background-color: white;
    display: flex;
    flex-direction: column;
    text-align: center;
    overflow: hidden;
`;

const ImageDisplayDiv = styled.div`
    flex: 0 1 auto;
    overflow: hidden;
`;

const Image = styled.img`
    max-height: 55vh;
    max-width: 55vh;
`;

const ReasonParagraph = styled.p`
    background: aquamarine;
    margin: 0;
`;

function CenterPopup(props: CenterPopupProps): ReactElement {
    return (
        <PopupDiv>
            <ImageDisplayDiv>
                <Image src={props.imageUrl} alt={props.alt} />
            </ImageDisplayDiv>
            <ReasonParagraph>{props.reason}</ReasonParagraph>
        </PopupDiv>
    );
}

export default CenterPopup;
