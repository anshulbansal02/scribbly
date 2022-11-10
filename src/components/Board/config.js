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

export { ToolsEnum, BrushModeEnum, CanvasCommandEnum };
