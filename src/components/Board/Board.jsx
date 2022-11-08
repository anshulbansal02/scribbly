import "./board.css";

import { useRef, useEffect } from "react";

import useCanvas from "hooks/useCanvas";
import { getEventCoords } from "utils";
import { Toolbox } from "components";
import { useAtomValue } from "jotai";
import { selectedColorAtom, selectedToolAtom } from "atoms/canvasAtoms";

function Board() {
    const [canvasRef, canvas] = useCanvas();
    const canvasPaperRef = useRef(null);
    const pointerRef = useRef(null);

    const touchedRef = useRef(false);

    const selectedColor = useAtomValue(selectedColorAtom);
    const selectedTool = useAtomValue(selectedToolAtom);

    // Selected Tool/Color Change
    useEffect(() => {
        if (selectedTool === "brush") {
            canvas.setColor(selectedColor);
        } else if (selectedTool === "eraser") {
            canvas.setColor("#fff");
        } else if (selectedColor === "bucket") {
        }
    }, [selectedColor, canvas, selectedTool]);

    // Fit canvas to container

    useEffect(() => {
        function resizeCanvas() {
            const { width, height } =
                canvasPaperRef.current.getBoundingClientRect();

            const pixelRatio = window.devicePixelRatio;

            canvasRef.current.width = width * pixelRatio;
            canvasRef.current.height = height * pixelRatio;
        }
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    // Canvas Events
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

    // Pointer Events
    function movePointer(e) {
        const tX = e.nativeEvent.offsetX;
        const tY = e.nativeEvent.offsetY;
        pointerRef.current.style.transform = `translate3d(${tX}px, ${tY}px, 0)`;
    }

    function hidePointer() {
        pointerRef.current.style.display = "none";
    }

    function showPointer() {
        const pointerStyle = pointerRef.current.style;
        pointerStyle.display = "block";
        if (selectedTool === "eraser") {
            pointerStyle.backgroundColor = "#fff";
            pointerStyle.borderWidth = "1px";
            pointerStyle.opacity = 0.8;
        } else {
            pointerStyle.backgroundColor = selectedColor;
            pointerStyle.borderWidth = 0;
            pointerStyle.opacity = 0.5;
        }
    }

    return (
        <div className="board">
            <div className="canvas-container">
                <div
                    className="paper"
                    ref={canvasPaperRef}
                    onMouseEnter={showPointer}
                    onMouseMove={movePointer}
                    onMouseLeave={hidePointer}
                    onPointerDown={handleTouch}
                    onPointerMove={handleDrag}
                    onPointerUp={handleLift}
                    onPointerOut={handleLift}
                    onPointerCancel={handleLift}
                >
                    <canvas ref={canvasRef} />
                    <div className="canvas-pointer" ref={pointerRef}></div>
                </div>
            </div>
            <Toolbox />
        </div>
    );
}

export default Board;
