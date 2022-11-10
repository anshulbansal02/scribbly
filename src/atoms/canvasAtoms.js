import { ToolsEnum } from "components/Board/config";
import { atom } from "jotai";

const selectedToolAtom = atom(ToolsEnum.BRUSH);
const selectedColorAtom = atom("#000000");
const selectedStrokeAtom = atom(10);

export { selectedColorAtom, selectedToolAtom, selectedStrokeAtom };
