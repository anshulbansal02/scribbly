import { useEffect, useRef } from "react";
import { hexToRgba } from "utils";

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

    function colorMatch(c1, c2, thresh = 1) {
        return c1.R === c2.R && c1.G === c2.G && c1.B === c2.B;
    }

    function fill(point, fillColor = color) {
        cmdHistory.add({ cmd: "fill", data: { point, color: fillColor } });
        const ctx = ctxRef.current;
        const imageData = ctx.getImageData(
            0,
            0,
            ctx.canvas.width,
            ctx.canvas.height
        );

        function getPixelColor({ x, y }) {
            const index = (y * imageData.width + x) * 4;
            const k = {
                R: imageData.data[index],
                G: imageData.data[index + 1],
                B: imageData.data[index + 2],
                A: imageData.data[index + 3],
            };
            return k;
        }

        function setPixelColor({ x, y }, color) {
            const index = (y * imageData.width + x) * 4;
            imageData.data[index] = color.R;
            imageData.data[index + 1] = color.G;
            imageData.data[index + 2] = color.B;
            imageData.data[index + 3] = color.A;
        }

        const initialColor = getPixelColor(point);
        const finalColor = hexToRgba(fillColor);

        const stack = [point];
        while (stack.length) {
            const pixel = stack.pop();

            while (
                pixel.y >= 0 &&
                colorMatch(getPixelColor(pixel), initialColor)
            ) {
                pixel.y -= 1;
            }
            pixel.y += 1;

            let reachLeft = false;
            let reachRight = false;

            while (
                pixel.y <= ctx.canvas.height &&
                colorMatch(getPixelColor(pixel), initialColor)
            ) {
                setPixelColor(pixel, finalColor);

                // Check left pixel
                if (pixel.x > 0) {
                    const leftPixel = { x: pixel.x - 1, y: pixel.y };
                    if (colorMatch(getPixelColor(leftPixel), initialColor)) {
                        if (!reachLeft) {
                            stack.push(leftPixel);
                            reachLeft = true;
                        }
                    } else if (reachLeft) {
                        reachLeft = false;
                    }
                }

                // Check right pixel
                if (pixel.x < ctx.canvas.width) {
                    const rightPixel = { x: pixel.x + 1, y: pixel.y };
                    if (colorMatch(getPixelColor(rightPixel), initialColor)) {
                        if (!reachRight) {
                            stack.push(rightPixel);
                            reachRight = true;
                        }
                    } else if (reachRight) {
                        reachRight = false;
                    }
                }

                pixel.y += 1;
            }
        }
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
