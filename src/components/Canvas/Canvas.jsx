import "./canvas.css";

const Canvas = ({ reference, height, width, onTouch, onDrag, onLift }) => {
    return (
        <canvas
            height={height}
            width={width}
            ref={reference}
            onMouseDown={onTouch}
            onTouchStart={onTouch}
            onMouseMove={onDrag}
            onTouchMove={onDrag}
            onMouseUp={onLift}
            onMouseOut={onLift}
            onTouchEnd={onLift}
            onTouchCancel={onLift}
        ></canvas>
    );
};

export default Canvas;
