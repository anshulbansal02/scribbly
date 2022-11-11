import { atom } from "jotai";

import { ToolsEnum } from "store/constants/canvas";

const selectedToolAtom = atom(ToolsEnum.BRUSH);
const selectedColorAtom = atom("#000000");
const selectedStrokeAtom = atom(10);

export { selectedColorAtom, selectedToolAtom, selectedStrokeAtom };
