import { useRef } from "react";

const useCommandHistory = () => {
    const undoStack = useRef([]);
    const redoStack = useRef([]);
    const isEnabled = useRef(true);

    const lastCmd = () => {
        return undoStack.current.at(-1);
    };

    const add = (cmd, data, options) => {
        if (isEnabled.current) {
            undoStack.current.push({ cmd, data });
            redoStack.current.length = 0;
        }
        return undoStack.current;
    };

    const undo = () => {
        if (undoStack.current.length) {
            const undoCmd = undoStack.current.pop();
            redoStack.current.push(undoCmd);
        }

        return undoStack.current;
    };

    const redo = () => {
        if (redoStack.current.length) {
            const redoCmd = redoStack.current.pop();
            undoStack.current.push(redoCmd);
        }

        return undoStack.current;
    };

    const disable = () => {
        isEnabled.current = false;
    };

    const enable = () => {
        isEnabled.current = true;
    };

    const clear = () => {
        undoStack.current.length = 0;
        redoStack.current.length = 0;
    };

    return { redo, undo, add, enable, disable, clear, lastCmd };
};

export { useCommandHistory };
