import IOEvents from "config/events";
import { useCanvas } from "hooks";
const { useSocket } = require("contexts/SocketContext");
const { useCommandHistory } = require("hooks/useCommandHistory");
const { useEffect, useState, useRef } = require("react");
const { CanvasCommandEnum, CanvasCommandLookup } = require("./config");

export default function useConnectedCanvas() {
    const [canvasRef, canvasMethods] = useCanvas();
    const socket = useSocket();
    const commandHistory = useCommandHistory();

    const [shouldEmit, setShouldEmit] = useState(true);

    const eventQueue = useRef([]);
    const canvasQueue = useRef([]);

    function processEventQueue() {
        const [commandSeq, ...command] = eventQueue.current[0];
        const expectedSeq = commandHistory.getExpectedSequence();
        if (commandSeq !== expectedSeq) {
            socket.emit(
                IOEvents.CANVAS_HISTORY_QUERY,
                { from: expectedSeq, to: commandSeq - 1 },
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
        const [commandSeq, ...command] = canvasQueue.shift();
        // Get method for the command
        // Call that method
    }

    useEffect(() => {
        // const queueProcessingInterval = setInterval(() => {
        //     processEventQueue();
        //     processCanvasQueue();
        // }, 0);

        socket.on(IOEvents.CANVAS, (command) => {
            eventQueue.push(command);
        });

        return () => {
            // clearInterval(queueProcessingInterval);
            socket.off(IOEvents.CANVAS);
        };
    }, []);

    function decorator(command, func) {
        return (...args) => {
            const cache = func(...args);
            const entry = commandHistory.add(command, ...args);
            if (shouldEmit) socket.emit(IOEvents.CANVAS, entry);
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
        undo: decorator(CanvasCommandEnum.UNDO, undo),
        redo: decorator(CanvasCommandEnum.REDO, redo),
    };
    return [canvasRef, methods];
}
