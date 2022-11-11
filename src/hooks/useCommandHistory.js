import {
    CanvasCommandEnum,
    CanvasCommandLookup,
} from "components/Board/config";
import { useRef } from "react";

const useCommandHistory = () => {
    const historyStack = useRef([]);
    const sequenceRef = useRef(0);
    const undoStack = useRef([]);
    const redoStack = useRef([]);

    const last = (stack) => {
        return stack.current.length ? stack.current.at(-1) : null;
    };

    const makeEntry = (cmd, data) => {
        // [SequenceNo, COMMAND, ...arguments]
        const entry = [sequenceRef.current, cmd, ...data];
        historyStack.current.push(entry);
        sequenceRef.current += 1;
        return entry;
    };

    const add = (cmd, ...data) => {
        const entry = makeEntry(cmd, data);

        if (CanvasCommandLookup[cmd].ignore) return entry;

        undoStack.current.push(entry);
        redoStack.current.length = 0;

        return entry;
    };

    const batchAdd = (commandList) => {
        const expectedSeq = getExpectedSequence();
        const [commandSeq, ...rest] = commandList[0];
        if (commandSeq !== expectedSeq) {
            throw new Error(
                `Commands out of order. Expected ${expectedSeq}, got ${commandSeq}`
            );
        }
        for (const [seq, cmd, ...data] of commandList) {
            add(cmd, ...data);
        }
    };

    // Returns the last command undoed
    const undo = () => {
        if (!undoStack.current.length) return;

        do {
            redoStack.current.push(undoStack.current.pop());
        } while (
            undoStack.current.length &&
            !CanvasCommandLookup[last(redoStack)[1]].undoable
        );

        if (last(redoStack)[1] === CanvasCommandEnum.COMPLETE_PATH) {
            while (
                undoStack.current.length &&
                last(undoStack)[1] === CanvasCommandEnum.DRAW_PATH
            ) {
                redoStack.current.push(undoStack.current.pop());
            }
        }
    };

    // Returns the last command redoed
    const redo = () => {
        if (!redoStack.current.length) return [];

        const executableCommands = [];

        do {
            const lastCmd = redoStack.current.pop();
            undoStack.current.push(lastCmd);
            executableCommands.push(lastCmd);
        } while (
            redoStack.current.length &&
            !CanvasCommandLookup[last(undoStack)[1]].undoable
        );

        if (last(undoStack)[1] === CanvasCommandEnum.DRAW_PATH) {
            do {
                const lastCmd = redoStack.current.pop();
                undoStack.current.push(lastCmd);
                executableCommands.push(lastCmd);
            } while (last(undoStack)[1] !== CanvasCommandEnum.COMPLETE_PATH);
        }

        return executableCommands;
    };

    const getCompressedState = () => {
        // Returns the current state
    };

    const getExpectedSequence = () => {
        return sequenceRef.current;
    };

    return {
        add,
        batchAdd,
        undo,
        redo,
        getCompressedState,
        getExpectedSequence,
    };
};

export { useCommandHistory };
