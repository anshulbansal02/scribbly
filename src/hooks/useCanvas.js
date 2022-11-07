import { useEffect, useRef } from "react";
import { getEventCoords } from "utils";

import { useCommandHistory } from "atoms/commandHistoryAtoms";

function useCanvas(eventCallback = () => {}) {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const cmdHistory = useCommandHistory();
    let pathPoints = [];

    let isTouched = false;
    let lastPoint = null;

    let color = "#000";
    let stroke = 2;

    // Initial Setup
    useEffect(() => {
        if (canvasRef.current && canvasRef.current.getContext) {
            const canvasContext = canvasRef.current.getContext("2d");
            ctxRef.current = canvasContext;
        } else {
            throw new Error("canvasRef is not bounded.");
        }
    }, []);

    const setStroke = (strokeWidth) => {
        stroke = strokeWidth;
    };

    const setColor = (strokeColor) => {
        color = strokeColor;
    };

    // Event Handlers
    const handleTouch = (e) => {
        isTouched = true;

        const point = getEventCoords(e);
        lastPoint = point;
        draw(point);

        eventCallback({ event: "touch", data: { ...point, color, stroke } });
    };

    const handleDrag = (e) => {
        if (isTouched) {
            const point = getEventCoords(e);
            draw(point);

            eventCallback({ event: "draw", data: { ...point, color, stroke } });
        }
    };

    const handleLift = (e) => {
        if (isTouched) {
            isTouched = false;

            breakPath();

            const point = getEventCoords(e);
            eventCallback({ event: "lift", data: point });
        }
    };

    function breakPath() {
        lastPoint = null;
        cmdHistory.add({ cmd: "path", data: pathPoints });
        pathPoints = [];
    }

    // Canvas Manipulation Methods
    function draw(point, strokeWidth = stroke, strokeColor = color) {
        // Needs a better way
        const ctx = ctxRef.current;

        // Need to move out
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // Set stroke and color
        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = strokeColor;

        // Push to path history
        pathPoints.push({
            point,
            stroke: strokeWidth,
            color: strokeColor,
        });

        // Use current point as last point if no last point
        if (lastPoint === null) lastPoint = point;

        // Render path
        ctx.beginPath();
        ctx.quadraticCurveTo(lastPoint.x, lastPoint.y, point.x, point.y);
        ctx.stroke();

        lastPoint = point;
    }

    function redraw(history) {}

    function undo() {
        redraw(cmdHistory.undo());
    }

    function fill(point, fillColor = color) {
        cmdHistory.add({ cmd: "fill", data: { point, color: fillColor } });
        // Needs Implementation
    }

    function clear() {
        const ctx = ctxRef.current;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        cmdHistory.add({ cmd: "clear" });
    }

    return [
        canvasRef,
        {
            onPointerDown: handleTouch,
            onPointerMove: handleDrag,
            onPointerUp: handleLift,
            onPointerLeave: handleLift,
            onPointerOut: handleLift,
            onPointerCancel: handleLift,
        },
        { draw, fill, clear, undo, setStroke, setColor },
    ];
}

export default useCanvas;
