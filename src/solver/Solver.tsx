import { ChangeEvent, ReactElement, useRef, useState } from "react";
import styled from "styled-components";

const SolverDiv = styled.div`
    position: relative;
    align-items: center;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1 1 auto;
    width: 100%;
    height: auto;
`;

const ImageDisplayBorder = styled.div`
    background-color: white;
    border-style: solid;
    border-color: purple;
    width: 40vh;
    height: 40vh;
`;

const ImageDisplay = styled.img`
    max-width: 100%;
    max-height: 100%;
`;

interface SolverProps {
    onPreviewError: (
        event: React.SyntheticEvent<HTMLImageElement, Event>,
        reason: string
    ) => void;
}

function Solver(props: SolverProps): ReactElement {
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files === null || files.length === 0) {
            alert(
                "idk how this happened but you didn't select a file\n\nstop breaking my app ! ! ! "
            );
            return;
        }

        const file = files[0];

        setFile(file);
    };

    return (
        <SolverDiv>
            <ImageDisplayBorder>
                {file ? (
                    <ImageDisplay
                        src={URL.createObjectURL(file)}
                        onError={(event) => {
                            props.onPreviewError(
                                event,
                                "that is not a valid image"
                            );

                            setFile(null);
                            if (inputRef.current !== null) {
                                inputRef.current.value = "";
                            }
                        }}
                    />
                ) : undefined}
            </ImageDisplayBorder>
            <input
                ref={inputRef}
                type="file"
                name="file"
                accept="image/*"
                onChange={selectFile}
            />
        </SolverDiv>
    );
}

export default Solver;
