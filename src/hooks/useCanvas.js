import { useEffect, useRef } from "react";

import { useCommandHistory } from "./useCommandHistory";

function useCanvas() {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const cmdHistory = useCommandHistory();
    let pathPoints = [];

    let lastPoint = null;

    let color = "#000";
    let stroke = 20;

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

    function completeDraw() {
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

    function redraw(history) {
        clear();
        for (const cmd of history) {
            if (cmd.cmd === "path") {
                for (const pathPt of cmd.data) {
                    const { point, stroke, color } = pathPt;
                    draw(point, stroke, color);
                }
                completeDraw();
            } else if (cmd.cmd === "fill") {
                const { point, color } = cmd.data;
                fill(point, color);
            } else if (cmd.cmd === "clear") {
                clear();
            }
        }
    }

    function undo() {
        cmdHistory.disable();
        redraw(cmdHistory.undo());
        cmdHistory.enable();
    }

    function redo() {
        cmdHistory.disable();
        redraw(cmdHistory.redo());
        cmdHistory.enable();
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
            draw,
            fill,
            clear,
            undo,
            redo,
            setStroke,
            setColor,
            completeDraw,
            redraw,
        },
    ];
}

export default useCanvas;
