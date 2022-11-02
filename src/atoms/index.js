import { atom } from "jotai";

const roomPlayersAtom = atom([]);
const roomOwnerAtom = atom(null);
const roomSettingsAtom = atom({});
const roomIdAtom = atom(null);

const usernameAtom = atom(null);

export {
    roomPlayersAtom,
    roomOwnerAtom,
    roomSettingsAtom,
    roomIdAtom,
    usernameAtom,
};
