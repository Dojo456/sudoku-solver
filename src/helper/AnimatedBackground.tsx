import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const swingingDakota = require("../assets/swinging-dakota.png");

export enum ShowableAnimations {
    SwingingDakota,
}

interface AnimatedBackgroundProps {
    animationToShow: ShowableAnimations | undefined;
    onComplete: () => void;
}

const BackgroundDiv = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
`;

export default function AnimatedBackground(
    props: AnimatedBackgroundProps
): React.ReactElement {
    const [position, setPosition] = useState({ ms: 0, x: 0, y: 0, rot: 0 });
    const ref = useRef(null);

    console.log("recreate animation");

    useEffect(() => {
        if (props.animationToShow !== undefined) {
            // @ts-ignore
            const height = ref.current.clientHeight;
            // @ts-ignore
            const width = ref.current.clientWidth;

            console.log("dimensions are", width, height);

            const animationInterval = 16.7;
            // in milliseconds
            const animationTime = 2000;

            const xIncrement = width / (animationTime / animationInterval);

            const rotsPerSec = 2;
            const rotIncrement =
                (360 * rotsPerSec) / (1000 / animationInterval);

            console.log("xIncrement", xIncrement);
            console.log("rotIncrement", rotIncrement);

            const interval = setInterval(() => {
                setPosition(({ ms, x, y, rot }) => {
                    const percent = 100 * (ms / animationTime);

                    console.log("percent", percent);

                    const calculatedY =
                        -((height * 0.5) / 2500) * (percent * (percent - 100));

                    console.log("position", x, calculatedY);

                    return {
                        ms: ms + animationInterval,
                        x: x + xIncrement,
                        y: calculatedY,
                        rot: rot + rotIncrement,
                    };
                });
            }, animationInterval);

            const reset = () => {
                console.log("reset");

                clearInterval(interval);
                setPosition({
                    ms: 0,
                    x: 0,
                    y: 0,
                    rot: 0,
                });

                props.onComplete();
            };

            setTimeout(() => {
                reset();
            }, animationTime);
        }
        console.log("using effect");
    }, [props]);

    let animationShowing: any;

    if (props.animationToShow !== undefined) {
        animationShowing = (
            <span
                style={{
                    position: "absolute",
                    right: `${position.x}px`,
                    bottom: `${position.y}px`,
                }}
            >
                <p>Spinning Dakota!!!</p>
                <img
                    src={swingingDakota}
                    alt="swinging dakota"
                    style={{
                        transform: `rotate(${position.rot}deg)`,
                        width: "300px",
                    }}
                />
            </span>
        );
    }

    return <BackgroundDiv ref={ref}>{animationShowing}</BackgroundDiv>;
}
