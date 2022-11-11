import { BrushModeEnum } from "components/Board/config";
import { useEffect, useRef } from "react";
import {
    hexToRgba,
    colorMatch,
    getPixelColor,
    setPixelColor,
    coordsToIndex,
} from "utils";

export default function useCanvas() {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current && canvasRef.current.getContext) {
            const canvasContext = canvasRef.current.getContext("2d", {
                willReadFrequently: true,
            });

            ctxRef.current = canvasContext;
        } else {
            throw new Error("canvasRef is not bounded.");
        }
    }, [canvasRef]);

    let canvasColorRef = useRef("#000000");
    let lastPointRef = useRef(null);

    // Canvas properties methods
    function setColor(color) {
        canvasColorRef.current = color;
        ctxRef.current.strokeStyle = color;
    }

    function setStroke(stroke) {
        ctxRef.current.lineWidth = stroke;
    }

    function setBrushMode(mode) {
        const ctx = ctxRef.current;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        if (mode === BrushModeEnum.PAINT) {
            ctx.globalCompositeOperation = "source-over";
            ctx.strokeStyle = canvasColorRef.current;
        } else if (mode === BrushModeEnum.ERASE) {
            ctx.globalCompositeOperation = "destination-out";
            ctx.strokeStyle = "#000000";
        }
    }

    // Canvas manipulation methods
    function drawPath(point) {
        const ctx = ctxRef.current;
        // Use current point as last point if no last point
        if (lastPointRef.current === null) lastPointRef.current = point;
        // Render path
        ctx.beginPath();
        ctx.quadraticCurveTo(
            lastPointRef.current.x,
            lastPointRef.current.y,
            point.x,
            point.y
        );
        ctx.stroke();
        lastPointRef.current = point;
    }

    function completePath() {
        lastPointRef.current = null;
    }

    function fill(point) {
        const ctx = ctxRef.current;

        const imageData = ctx.getImageData(
            0,
            0,
            ctx.canvas.width,
            ctx.canvas.height
        );

        const initialColor = getPixelColor(point, imageData);
        const finalColor = hexToRgba(canvasColorRef.current);

        const stack = [point];
        while (stack.length) {
            const pixel = stack.pop();

            while (
                pixel.y >= 0 &&
                colorMatch(getPixelColor(pixel, imageData), initialColor)
            ) {
                pixel.y -= 1;
            }
            pixel.y += 1;

            let reachLeft = false;
            let reachRight = false;

            while (
                pixel.y <= ctx.canvas.height &&
                colorMatch(getPixelColor(pixel, imageData), initialColor)
            ) {
                setPixelColor(pixel, finalColor, imageData);

                // Check left pixel
                if (pixel.x > 0) {
                    const leftPixel = { x: pixel.x - 1, y: pixel.y };
                    if (
                        colorMatch(
                            getPixelColor(leftPixel, imageData),
                            initialColor
                        )
                    ) {
                        if (!reachLeft) {
                            stack.push(leftPixel);
                            reachLeft = true;
                        }
                    } else {
                        reachLeft = false;
                    }
                }

                // Check right pixel
                if (pixel.x < ctx.canvas.width) {
                    const rightPixel = { x: pixel.x + 1, y: pixel.y };
                    if (
                        colorMatch(
                            getPixelColor(rightPixel, imageData),
                            initialColor
                        )
                    ) {
                        if (!reachRight) {
                            stack.push(rightPixel);
                            reachRight = true;
                        }
                    } else {
                        reachRight = false;
                    }
                }

                pixel.y += 1;
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }

    function clear() {
        const ctx = ctxRef.current;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    return [
        canvasRef,
        {
            setStroke,
            setColor,
            setBrushMode,
            drawPath,
            completePath,
            fill,
            clear,
        },
    ];
}
