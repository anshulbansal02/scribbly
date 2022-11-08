import { atom } from "jotai";

const selectedToolAtom = atom("brush");
const selectedColorAtom = atom();
const selectedStrokeAtom = atom();

export { selectedColorAtom, selectedToolAtom, selectedStrokeAtom };
