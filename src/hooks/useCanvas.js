import { useEffect, useRef } from "react";

function useCanvas() {
    const canvasRef = useRef();
    const ctxRef = useRef();

    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d");
        ctxRef.current = ctx;

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
    }, []);

    const canvasMethods = {
        beginPath() {
            const ctx = ctxRef.current;
            ctx.beginPath();
        },

        draw({ x, y }, stroke, color) {
            const ctx = ctxRef.current;
            ctx.lineWidth = stroke || 2;
            ctx.strokeStyle = color || "#000";
            ctx.lineTo(x, y);
            ctx.moveTo(x, y);
            ctx.stroke();
        },

        fill({ x, y }, color) {
            // Implementation needed
        },

        clear() {
            const ctx = ctxRef.current;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        },

        save() {
            // Implementation needed
        },
    };
    return { canvas: canvasMethods, canvasRef };
}

export default useCanvas;
