import { atom } from "jotai";
import { gameSettingsOptions } from "config";

const roomPlayersAtom = atom([]);
const playerAtom = atom(null);
const roomOwnerAtom = atom(null);

const gameSettingsAtom = atom({
    drawingTime: gameSettingsOptions.drawingTime.default,
    rounds: gameSettingsOptions.rounds.default,
    difficulty: gameSettingsOptions.difficulty.default,
});

const roomIdAtom = atom(null);
const roomJoinURLAtom = atom((get) => `scribbly.app/join/${get(roomIdAtom)}`);

const usernameAtom = atom(null);

const toastsAtom = atom([]);

export {
    roomPlayersAtom,
    playerAtom,
    roomOwnerAtom,
    gameSettingsAtom,
    roomIdAtom,
    roomJoinURLAtom,
    usernameAtom,
    toastsAtom,
};
