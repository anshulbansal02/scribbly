import "./board.css";

import { useRef, useEffect } from "react";

import useCanvas from "hooks/useCanvas";
import { getEventCoords } from "utils";
import { Toolbox } from "components";
import { useAtomValue } from "jotai";
import { selectedColorAtom } from "atoms/canvasAtoms";

function Board() {
    const [canvasRef, canvas] = useCanvas();
    const touchedRef = useRef(false);

    const selectedColor = useAtomValue(selectedColorAtom);

    useEffect(() => {
        canvas.setColor(selectedColor);
    }, [selectedColor, canvas]);

    // Fit canvas to container
    const canvasPaperRef = useRef(null);
    const resizeCanvas = () => {
        const { width, height } =
            canvasPaperRef.current.getBoundingClientRect();

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

    const pointerRef = useRef(null);

    function movePointer(e) {
        const tX = e.nativeEvent.offsetX;
        const tY = e.nativeEvent.offsetY;
        pointerRef.current.style.display = "block";

        pointerRef.current.style.backgroundColor = selectedColor;

        pointerRef.current.style.transform = `translate3d(${tX}px, ${tY}px, 0)`;
    }

    function hidePointer() {
        pointerRef.current.style.display = "none";
    }

    return (
        <div className="board">
            <div className="canvas-container">
                <div
                    className="paper"
                    ref={canvasPaperRef}
                    onMouseMove={movePointer}
                    onMouseLeave={hidePointer}
                >
                    <canvas
                        ref={canvasRef}
                        onPointerDown={handleTouch}
                        onPointerMove={handleDrag}
                        onPointerUp={handleLift}
                        onPointerOut={handleLift}
                        onPointerCancel={handleLift}
                    />
                    <div className="canvas-pointer" ref={pointerRef}></div>
                </div>
            </div>
            <Toolbox />
        </div>
    );
}

export default Board;
