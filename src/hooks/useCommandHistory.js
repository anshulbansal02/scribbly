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
        let lastCmd = undoStack.current.at(-1);
        while (
            undoStack.current.length &&
            !CanvasCommandLookup[lastCmd[1]].undoable
        ) {
            redoStack.current.push(undoStack.current.pop());
            lastCmd = undoStack.current.at(-1);
        }

        if (!undoStack.current.length) {
            return;
        }

        redoStack.current.push(undoStack.current.pop());
        if (redoStack.current.at(-1)[1] === CanvasCommandEnum.COMPLETE_PATH) {
            while (
                undoStack.current.length &&
                undoStack.current.at(-1)[1] === CanvasCommandEnum.DRAW_PATH
            ) {
                redoStack.current.push(undoStack.current.pop());
            }
        }
    };

    // Returns the last command redoed
    const redo = () => {};

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
