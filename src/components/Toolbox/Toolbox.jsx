import "./toolbox.css";

import { useAtom } from "jotai";

import { selectedColorAtom, selectedToolAtom } from "atoms/canvasAtoms";

import { tools, colors } from "./toolsConfig";

export default function Toolbox() {
    const [selectedColor, setSelectedColor] = useAtom(selectedColorAtom);
    const [selectedTool, setSelectedTool] = useAtom(selectedToolAtom);

    return (
        <div className="toolbox">
            <div className="tool-selector">
                {tools.map((tool) => {
                    const isSelected =
                        tool.value === selectedTool ? "tool selected" : "tool";
                    return (
                        <button
                            key={tool.value}
                            className={isSelected}
                            onClick={() => setSelectedTool(tool.value)}
                        >
                            {tool.component}
                        </button>
                    );
                })}
            </div>

            <div className="color-selector">
                <div
                    className="selected-color"
                    style={{ backgroundColor: selectedColor }}
                ></div>
                <div className="palette">
                    {colors.map((color) => (
                        <button
                            onClick={() => setSelectedColor(color)}
                            key={color}
                            className="color"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
