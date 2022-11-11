import "./board.css";

import { useRef, useEffect } from "react";
import { useAtomValue } from "jotai";

import { getEventCoords } from "utils";
import {
    selectedColorAtom,
    selectedStrokeAtom,
    selectedToolAtom,
} from "store/atoms/canvasAtoms";
import { BrushModeEnum, ToolsEnum } from "store/constants/canvas";
import { useConnectedCanvas } from "shared/hooks";

import { Toolbox } from "routes/components";

function Board() {
    const [canvasRef, canvas] = useConnectedCanvas();
    const canvasPaperRef = useRef(null);
    const pointerRef = useRef(null);

    const touchedRef = useRef(false);

    // Canvas State
    const selectedColor = useAtomValue(selectedColorAtom);
    const selectedTool = useAtomValue(selectedToolAtom);
    const selectedStroke = useAtomValue(selectedStrokeAtom);

    useEffect(() => {
        canvas.setColor(selectedColor);
    }, [canvas, selectedColor]);

    useEffect(() => {
        canvas.setStroke(selectedStroke);
        const pointerStyle = pointerRef.current.style;
        const pointerSize = selectedStroke / 2;
        pointerStyle.width = `${pointerSize}px`;
        pointerStyle.height = `${pointerSize}px`;
        pointerStyle.top = `-${pointerSize / 2}px`;
        pointerStyle.left = `-${pointerSize / 2}px`;
    }, [canvas, selectedStroke]);

    useEffect(() => {
        if (selectedTool === ToolsEnum.ERASER) {
            canvas.setBrushMode(BrushModeEnum.ERASE);
        } else {
            canvas.setBrushMode(BrushModeEnum.PAINT);
        }
    }, [canvas, selectedTool]);

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
        const point = getEventCoords(e);
        if (
            selectedTool === ToolsEnum.BRUSH ||
            selectedTool === ToolsEnum.ERASER
        ) {
            touchedRef.current = true;
            canvas.drawPath(point);
        } else if (selectedTool === ToolsEnum.BUCKET) {
            canvas.fill(point);
        }
    };

    const handleDrag = (e) => {
        if (touchedRef.current) {
            const point = getEventCoords(e);
            canvas.drawPath(point);
        }
    };

    const handleLift = (e) => {
        if (touchedRef.current) {
            touchedRef.current = false;
            canvas.completePath();
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
        if (selectedTool === ToolsEnum.ERASER) {
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
            <Toolbox genericHandler={(action) => canvas[action]()} />
        </div>
    );
}

export default Board;
