import "./toolbox.css";

import { useAtom } from "jotai";

import { selectedColorAtom, selectedToolAtom } from "store/atoms/canvasAtoms";
import { tools, colors } from "./config";

import { ReactComponent as TrashIcon } from "./static/trash.svg";
import { ReactComponent as UndoIcon } from "./static/undo.svg";
import { ReactComponent as RedoIcon } from "./static/redo.svg";

export default function Toolbox({ genericHandler }) {
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

            <div className="misc-tools">
                <button className="tool" onClick={() => genericHandler("undo")}>
                    <UndoIcon />
                </button>

                <button className="tool" onClick={() => genericHandler("redo")}>
                    <RedoIcon />
                </button>

                <button
                    className="tool"
                    onClick={() => genericHandler("clear")}
                >
                    <TrashIcon />
                </button>
            </div>
        </div>
    );
}
