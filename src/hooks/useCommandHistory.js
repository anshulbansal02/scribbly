import { useRef, useState } from "react";

const useCommandHistory = () => {
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const isEnabled = useRef(true);

    const add = (cmd) => {
        if (isEnabled.current) {
            setUndoStack((undoStack) => [...undoStack, cmd]);
            setRedoStack([]);
        }
        return [...undoStack, cmd];
    };

    const undo = () => {
        const undoCmd = undoStack.at(-1);
        setRedoStack((redoStack) => [...redoStack, undoCmd]);
        setUndoStack((undoStack) => undoStack.slice(0, -1));
        return undoStack.slice(0, -1);
    };

    const redo = () => {
        const redoCmd = redoStack.at(-1);
        setUndoStack((undoStack) => [...undoStack, redoCmd]);
        setRedoStack((redoStack) => redoStack.slice(0, -1));
        return [...undoStack, redoCmd];
    };

    const disable = () => {
        isEnabled.current = false;
    };

    const enable = () => {
        isEnabled.current = true;
    };

    return { redo, undo, add, enable, disable };
};

export { useCommandHistory };
