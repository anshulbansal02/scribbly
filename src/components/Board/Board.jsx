import { useEffect, useState, useContext } from "react";
import Canvas from "../Canvas/Canvas";
import useCanvas from "../../hooks/useCanvas";

import SocketContext from "./../../contexts/SocketContext";

import Toolbox from "../Toolbox/Toolbox";

import { getEventCoords, getNormalizedCoords } from "./utils";

const Board = () => {
    const { canvas, canvasRef } = useCanvas();
    const [isTouched, setIsTouched] = useState(false);
    const [isActive, setIsActive] = useState(true);

    const socket = useContext(SocketContext);

    useEffect(() => {
        // Socket event handlers
        socket.on("board-active", (isActive) => {
            setIsActive(isActive);
        });

        socket.on("canvas-begin-draw", (data) => {
            canvas.beginPath();

            canvas.draw(
                getNormalizedCoords(data.point),
                data.stroke,
                data.color
            );
        });

        socket.on("canvas-draw", (data) => {
            canvas.draw(
                getNormalizedCoords(data.point),
                data.stroke,
                data.color
            );
        });

        socket.on("canvas-fill", (data) => {
            canvas.fill(getNormalizedCoords(data.point), data.color);
        });

        socket.on("canvas-clear", () => {
            canvas.clear();
        });
    }, [socket]);

    // Mouse and Touch event handlers
    const handleTouch = (e) => {
        if (!isActive) return;

        setIsTouched(true);
        canvas.beginPath();
        const coords = getEventCoords(e);
        canvas.draw(coords);

        socket.emit("canvas-begin-draw", { point: coords });
    };

    const handleDrag = (e) => {
        if (!isActive) return;
        if (isTouched) {
            const coords = getEventCoords(e);
            canvas.draw(coords);

            socket.emit("canvas-draw", { point: coords });
        }
    };

    const handleLift = () => {
        setIsTouched(false);
    };

    return (
        <>
            <h4>Drawing Canvas</h4>
            <Canvas
                reference={canvasRef}
                width="600px"
                height="300px"
                onTouch={handleTouch}
                onDrag={handleDrag}
                onLift={handleLift}
            />
            <Toolbox />
        </>
    );
};

export default Board;
