import IOEvents from "config/events";
import { useCanvas } from "hooks";
const { useSocket } = require("contexts/SocketContext");
const { useCommandHistory } = require("hooks/useCommandHistory");
const { useEffect, useState } = require("react");
const { CanvasCommandEnum } = require("./config");

export default function useConnectedCanvas() {
    const [canvasRef, canvasMethods] = useCanvas();
    const socket = useSocket();
    const commandHistory = useCommandHistory();
    const [shouldEmit, setShouldEmit] = useState(true);

    useEffect(() => {
        socket.on(IOEvents.CANVAS, (data) => {});

        return () => {
            socket.off(IOEvents.CANVAS);
        };
    });

    function decorator(command, func) {
        return (...args) => {
            const cache = func(...args);
            commandHistory.add(command, ...args, cache);
            if (shouldEmit) socket.emit(IOEvents.CANVAS, command, ...args);
        };
    }

    function undo() {}

    function redo() {}

    const methods = {
        setColor: decorator(
            CanvasCommandEnum.SET_COLOR,
            canvasMethods.setColor
        ),
        setStroke: decorator(
            CanvasCommandEnum.SET_STROKE,
            canvasMethods.setStroke
        ),
        setBrushMode: decorator(
            CanvasCommandEnum.SET_BRUSH_MODE,
            canvasMethods.setBrushMode
        ),
        drawPath: decorator(
            CanvasCommandEnum.DRAW_PATH,
            canvasMethods.drawPath
        ),
        completePath: decorator(
            CanvasCommandEnum.COMPLETE_PATH,
            canvasMethods.completePath
        ),
        fill: decorator(CanvasCommandEnum.FILL, canvasMethods.fill),
        clear: decorator(CanvasCommandEnum.CLEAR, canvasMethods.clear),
        undo,
        redo,
    };
    return [canvasRef, methods];
}
