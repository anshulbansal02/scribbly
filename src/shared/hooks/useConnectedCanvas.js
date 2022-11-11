import {
    CanvasCommandEnum,
    CanvasCommandLookup,
    CanvasModeEnum,
} from "store/constants/canvas";
import IOEvents from "store/constants/IOEvents";
import { useCanvas, useSocket, useCommandHistory } from "shared/hooks";

const { useEffect, useState, useRef } = require("react");

export default function useConnectedCanvas() {
    const [canvasRef, canvasMethods] = useCanvas();
    const socket = useSocket();
    const commandHistory = useCommandHistory();

    const [canvasMode, setCanvasMode] = useState(CanvasModeEnum.DRAW);

    const eventQueue = useRef([]);
    const canvasQueue = useRef([]);

    useEffect(() => {
        function processEventQueue() {
            const [seq, ...command] = eventQueue.current[0];
            const expectedSeq = commandHistory.getExpectedSequence();
            if (seq !== expectedSeq) {
                socket.emit(
                    IOEvents.CANVAS_HISTORY_QUERY,
                    { from: expectedSeq, to: seq - 1 },
                    (commandHistory) => {
                        // Add to command history
                        commandHistory.batchAdd(commandHistory);
                        const commands = commandHistory.getCompressedState();
                        draw(commands);
                    }
                );
            }
            eventQueue.current.shift();
            canvasQueue.current.push(command);
        }

        function processCanvasQueue() {
            const [seq, cmd, ...args] = canvasQueue.shift();
            const canvasMethodName = CanvasCommandLookup[cmd].method;
            decoratedCanvasMethods[canvasMethodName](...args);
        }

        let queueProcessingInterval;
        if (canvasMode === CanvasModeEnum.VIEW_ONLY) {
            clearInterval(queueProcessingInterval);
            queueProcessingInterval = setInterval(() => {
                processEventQueue();
                processCanvasQueue();
            }, 0);
        }

        return () => {
            clearInterval(queueProcessingInterval);
        };
    }, [canvasMode]);

    useEffect(() => {
        socket.on(IOEvents.CANVAS, (command) => {
            eventQueue.push(command);
        });

        return () => {
            socket.off(IOEvents.CANVAS);
        };
    }, []);

    const setMode = (mode) => {
        setCanvasMode(mode);
        eventQueue.current = [];
        canvasQueue.current = [];
        commandHistory.reset();
        canvasMethods.clear();
    };

    function decorator(command, func) {
        return (...args) => {
            const cache = func(...args);
            const entry = commandHistory.add(command, ...args);
            if (canvasMode === CanvasModeEnum.VIEW_ONLY)
                socket.emit(IOEvents.CANVAS, entry);
        };
    }

    function draw(commands) {
        for (const command of commands) {
            const [seq, cmd, ...args] = command;
            const canvasMethodName = CanvasCommandLookup[cmd].method;
            canvasMethods[canvasMethodName](...args);
        }
    }

    function undo() {
        commandHistory.undo();
        const redrawCommands = commandHistory.getCompressedState();
        canvasMethods.clear();
        draw(redrawCommands);
    }

    function redo() {
        const redoCommands = commandHistory.redo();
        draw(redoCommands);
    }

    const decoratedCanvasMethods = {
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
        undo: decorator(CanvasCommandEnum.UNDO, undo),
        redo: decorator(CanvasCommandEnum.REDO, redo),
        setMode,
    };
    return [canvasRef, decoratedCanvasMethods];
}
