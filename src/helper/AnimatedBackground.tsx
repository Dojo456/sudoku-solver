import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const swingingDakota = require("../assets/swinging-dakota.png");

export enum ShowableAnimations {
    SpinningDakota,
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
    const [position, setPosition] = useState({ x: 0, y: 0, rot: 0 });
    const ref = useRef(null);

    useEffect(() => {
        if (props.animationToShow !== undefined) {
            // @ts-ignore
            const height = ref.current.clientHeight;
            // @ts-ignore
            const width = ref.current.clientWidth;

            // in milliseconds
            const animationTime = 4000;

            const totalRots = 3;

            let start: number, previousTimeStamp: number;
            const step = (timestamp: number) => {
                if (start === undefined) {
                    start = previousTimeStamp = timestamp;
                }
                const elapsed = timestamp - start;
                const animationInterval = 0.5 * (timestamp - previousTimeStamp);

                const xIncrement = width / (animationTime / animationInterval);

                const rotIncrement =
                    (360 * totalRots) / (animationTime / animationInterval);

                if (previousTimeStamp !== timestamp) {
                    setPosition((state) => {
                        const { x, rot } = state;
                        const percent = 100 * (elapsed / animationTime);

                        const calculatedY =
                            -((height * 0.5) / 2500) *
                            (percent * (percent - 100));

                        return {
                            x: x + xIncrement,
                            y: calculatedY,
                            rot: rot + rotIncrement,
                        };
                    });
                }

                if (elapsed < animationTime) {
                    previousTimeStamp = timestamp;
                    requestAnimationFrame(step);
                } else {
                    setPosition({ x: 0, y: 0, rot: 0 });

                    props.onComplete();
                }
            };

            requestAnimationFrame(step);
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
