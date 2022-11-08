import "./board.css";

import { useRef, useEffect } from "react";

import useCanvas from "hooks/useCanvas";
import { getEventCoords } from "utils";

function Board() {
    const [canvasRef, canvas] = useCanvas();
    const touchedRef = useRef(false);

    // Fit canvas to container
    const canvasPaperRef = useRef(null);
    const resizeCanvas = () => {
        const { width, height } =
            canvasPaperRef.current.getBoundingClientRect();

        console.log(width * 2, height * 2);

        const pixelRatio = window.devicePixelRatio;

        canvasRef.current.width = width * pixelRatio;
        canvasRef.current.height = height * pixelRatio;
    };
    useEffect(() => {
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    // Event Handlers
    const handleTouch = (e) => {
        touchedRef.current = true;

        const point = getEventCoords(e);
        canvas.draw(point);
    };

    const handleDrag = (e) => {
        if (touchedRef.current) {
            const point = getEventCoords(e);
            canvas.draw(point);
        }
    };

    const handleLift = (e) => {
        if (touchedRef.current) {
            touchedRef.current = false;
            canvas.completeDraw();
        }
    };

    return (
        <div className="board">
            <div className="canvas-container">
                <div className="paper" ref={canvasPaperRef}>
                    <canvas
                        ref={canvasRef}
                        onPointerDown={handleTouch}
                        onPointerMove={handleDrag}
                        onPointerUp={handleLift}
                        onPointerOut={handleLift}
                        onPointerCancel={handleLift}
                    />
                </div>
            </div>
            <div className="toolbox">Toolbox</div>
        </div>
    );
}

export default Board;
