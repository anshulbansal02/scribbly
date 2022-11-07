import { atom, useAtom } from "jotai";

const undoStackAtom = atom([]);
const redoStackAtom = atom([]);

const useCommandHistory = () => {
    const [undoStack, setUndoStack] = useAtom(undoStackAtom);
    const [redoStack, setRedoStack] = useAtom(redoStackAtom);

    const add = (cmd) => {
        setUndoStack((undoStack) => [...undoStack, cmd]);
        setRedoStack([]);
        return undoStack;
    };

    const undo = () => {
        const undoCmd = undoStack.at(-1);
        setRedoStack((redoStack) => [...redoStack, undoCmd]);
        setUndoStack((undoStack) => undoStack.slice(0, -1));
        return undoStack;
    };

    const redo = () => {
        const redoCmd = redoStack.at(-1);
        setUndoStack((undoStack) => [...undoStack, redoCmd]);
        setRedoStack((redoStack) => redoStack.slice(0, -1));
        return undoStack;
    };

    return { redo, undo, add };
};

export { useCommandHistory };
