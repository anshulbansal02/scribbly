const ToolsEnum = Object.freeze({
    BRUSH: 0,
    ERASER: 1,
    BUCKET: 3,
});

const BrushModeEnum = Object.freeze({
    PAINT: 0,
    ERASE: 1,
});

const CanvasCommandEnum = Object.freeze({
    // Overlapping
    SET_COLOR: 0,
    SET_STROKE: 1,
    SET_BRUSH_MODE: 2,
    // Clubbing
    DRAW_PATH: 3,
    COMPLETE_PATH: 4,
    FILL: 5,
    CLEAR: 6,
    // Ignorable
    UNDO: 7,
    REDO: 8,
});

const CanvasCommandLookup = {
    [CanvasCommandEnum.SET_COLOR]: { method: "setColor" },
    [CanvasCommandEnum.SET_STROKE]: { method: "setStroke" },
    [CanvasCommandEnum.SET_BRUSH_MODE]: { method: "setBrushMode" },
    [CanvasCommandEnum.DRAW_PATH]: { undoable: true, method: "drawPath" },
    [CanvasCommandEnum.COMPLETE_PATH]: {
        undoable: true,
        method: "completePath",
    },
    [CanvasCommandEnum.FILL]: { undoable: true, method: "fill" },
    [CanvasCommandEnum.CLEAR]: { undoable: true, method: "clear" },
    [CanvasCommandEnum.UNDO]: { ignore: true, method: "undo" },
    [CanvasCommandEnum.REDO]: { ignore: true, method: "redo" },
};

export { ToolsEnum, BrushModeEnum, CanvasCommandEnum, CanvasCommandLookup };
