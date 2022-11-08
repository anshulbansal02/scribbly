import "./toolbox.css";

import { ReactComponent as BrushIcon } from "./icons/brush.svg";
import { ReactComponent as BucketIcon } from "./icons/bucket.svg";
import { ReactComponent as EraserIcon } from "./icons/eraser.svg";

import { colors } from "./colors";
import { useAtom } from "jotai";
import { selectedColorAtom } from "atoms/canvasAtoms";

export default function Toolbox() {
    const [selectedColor, setSelectedColor] = useAtom(selectedColorAtom);

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    return (
        <div className="toolbox">
            <div className="tool-selector">
                <button className="icon-btn">
                    <BrushIcon />
                </button>
                <button className="icon-btn">
                    <BucketIcon />
                </button>
                <button className="icon-btn">
                    <EraserIcon />
                </button>
            </div>

            <div className="color-selector">
                <div className="palette">
                    {colors.map((color) => (
                        <div
                            onClick={() => handleColorChange(color)}
                            key={color}
                            className="color"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            </div>

            <div className="stroke-selector"></div>

            <div className="misc-tools"></div>
        </div>
    );
}
