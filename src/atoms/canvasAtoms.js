import { atom } from "jotai";

const selectedToolAtom = atom();
const selectedColorAtom = atom();
const selectedStrokeAtom = atom();

export { selectedColorAtom, selectedToolAtom, selectedStrokeAtom };
