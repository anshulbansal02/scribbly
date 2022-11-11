const CanvasModeEnum = Object.freeze({
    VIEW_ONLY: 0,
    DRAW: 1,
});

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
    SET_COLOR: "SET_COLOR",
    SET_STROKE: "SET_STROKE",
    SET_BRUSH_MODE: "SET_BRUSH_MODE",
    // Clubbing
    DRAW_PATH: "DRAW_PATH",
    COMPLETE_PATH: "COMPLETE_PATH",
    FILL: "FILL",
    CLEAR: "CLEAR",
    // Ignorable
    UNDO: "UNDO",
    REDO: "REDO",
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

export {
    CanvasModeEnum,
    ToolsEnum,
    BrushModeEnum,
    CanvasCommandEnum,
    CanvasCommandLookup,
};
